const Member = require("../Models/Member");
const Membership = require("../Models/Membership");

// Helper to add months to a date
function addMonthsToDate(months, joiningDate) {
  const today = new Date(joiningDate);
  const futureMonth = today.getMonth() + months;
  const futureYear = today.getFullYear() + Math.floor(futureMonth / 12);
  const adjustedMonth = futureMonth % 12;
  const lastDay = new Date(futureYear, adjustedMonth + 1, 0).getDate();
  const adjustedDay = Math.min(today.getDate(), lastDay);
  return new Date(futureYear, adjustedMonth, adjustedDay);
}

// GET: All members (paginated)
exports.getAllMember = async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const totalMembers = await Member.countDocuments({ gym: req.user._id });

    const members = await Member.find({ gym: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: totalMembers ? "Fetched members successfully" : "No members found",
      members,
      totalMembers,
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ message: "Server error while fetching members." });
  }
};

// POST: Register member
exports.registerMember = async (req, res) => {
  try {
    const { name, mobileNo, address, membership, profilePic, joiningDate } = req.body;

    if (!name || !mobileNo || !address || !membership || !profilePic || !joiningDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingMember = await Member.findOne({ gym: req.user._id, mobileNo });
    if (existingMember) {
      return res.status(400).json({ message: "Already registered with this number." });
    }

    const foundMembership = await Membership.findOne({ _id: membership, gym: req.user._id });
    if (!foundMembership) {
      return res.status(404).json({ message: "Membership plan not found." });
    }

    const months = foundMembership.months;
    const nextBillDate = addMonthsToDate(months, joiningDate);

    const newMember = new Member({
      name,
      mobileNo,
      address,
      membership,
      gym: req.user._id,
      profilePic,
      lastPayment: new Date(joiningDate),
      nextBillDate,
    });

    await newMember.save();

    res.status(201).json({ message: "Member registered successfully!", member: newMember });
  } catch (error) {
    console.error("Error registering member:", error);
    res.status(500).json({ message: "Server error while registering member." });
  }
};

exports.searchMember = async (req, res) => {
  try {
    const { SearchTerm } = req.query;

    const members = await Member.find({
      gym: req.user._id,
      $or: [
        { name: { $regex: SearchTerm, $options: "i" } },
        { mobileNo: { $regex: SearchTerm, $options: "i" } },
      ],
    });

    res.status(200).json({
      message: members.length ? "Fetched members successfully" : "No members found",
      members,
      totalMembers: members.length,
    });
  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.monthlyMember = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const members = await Member.find({
      gym: req.user._id,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: members.length
        ? "Fetched members successfully"
        : "No members registered this month",
      members,
      totalMembers: members.length,
    });
  } catch (err) {
    console.error("Error in monthlyMember:", err);
    res.status(500).json({ error: "Server error while fetching monthly members" });
  }
};

exports.expiringWithin3Days = async (req, res) => {
  try {
    const today = new Date();
    const nextThreeDays = new Date();
    nextThreeDays.setDate(today.getDate() + 3);

    const members = await Member.find({
      gym: req.user._id,
      nextBillDate: { $gte: today, $lte: nextThreeDays },
    });

    res.status(200).json({
      message: members.length
        ? "Fetched members successfully"
        : "No members expiring in the next 3 days.",
      members,
      totalMembers: members.length,
    });
  } catch (err) {
    console.error("Error in expiringWithin3Days:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.expiringWithin4To7Days = async (req, res) => {
  try {
    const today = new Date();
    const day4 = new Date();
    const day7 = new Date();
    day4.setDate(today.getDate() + 4);
    day7.setDate(today.getDate() + 7);

    const members = await Member.find({
      gym: req.user._id,
      nextBillDate: { $gte: day4, $lte: day7 },
    });

    res.status(200).json({
      message: members.length
        ? "Fetched members successfully"
        : "No members expiring between 4 to 7 days.",
      members,
      totalMembers: members.length,
    });
  } catch (err) {
    console.error("Error in expiringWithin4To7Days:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.expired = async (req, res) => {
  try {
    const today = new Date();
    const members = await Member.find({
      gym: req.user._id,
      status: "Active",
      nextBillDate: { $lt: today },
    });

    res.status(200).json({
      message: members.length
        ? "Fetched expired members successfully"
        : "No expired members found.",
      members,
      totalMembers: members.length,
    });
  } catch (err) {
    console.error("Error in expired:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.inActive = async (req, res) => {
  try {
    const today = new Date();
    const members = await Member.find({
      gym: req.user._id,
      status: "Inactive",
      nextBillDate: { $lt: today },
    });

    res.status(200).json({
      message: members.length
        ? "Fetched inactive members successfully"
        : "No inactive members found.",
      members,
      totalMembers: members.length,
    });
  } catch (err) {
    console.error("Error in inActive:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getMemberDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findOne({ _id: id, gym: req.user._id });

    if (!member) {
      return res.status(404).json({ error: "No such member" });
    }

    res.status(200).json({
      message: "Member data fetched",
      member,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const member = await Member.findOne({ _id: id, gym: req.user._id });
    if (!member) {
      return res.status(404).json({ error: "No such member" });
    }

    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    member.status = status;
    await member.save();

    res.json({ message: "Member status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateMemberPlan = async (req, res) => {
  try {
    const { membership } = req.body;
    const { id } = req.params;

    const memberShip = await Membership.findOne({ gym: req.user._id, _id: membership });
    if (!memberShip) {
      return res.status(404).json({ error: "Membership not found" });
    }

    const months = memberShip.months;
    const today = new Date();
    const nextBillDate = addMonthsToDate(months, today);

    const member = await Member.findOne({ gym: req.user._id, _id: id });
    if (!member) {
      return res.status(404).json({ message: "No such member found" });
    }

    member.membership = membership;
    member.nextBillDate = nextBillDate;
    member.lastPayment = today;
    await member.save();

    res.json({ message: "Member plan updated successfully", member });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
