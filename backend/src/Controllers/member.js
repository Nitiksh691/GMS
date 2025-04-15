const Member = require("../Models/Member");
const Membership = require("../Models/Membershiop");

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

    const members = await Member.find({ gym: req.user._id });
    const totalMembers = members.length;

    const limitedMembers = await Member.find({ gym: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: totalMembers ? "Fetched members successfully" : "No members found",
      members: limitedMembers,
      totalMembers: totalMembers,
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

    // Check for existing member with the same phone
    const existingMember = await Member.findOne({ gym: req.user._id, mobileNo });
    if (existingMember) {
      return res.status(400).json({ message: "Already registered with this number." });
    }

    // Find membership plan
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
          { name: { $regex: SearchTerm, $options: 'i' } },  // Case-insensitive search
          { mobileNo: { $regex: SearchTerm, $options: 'i' } },
        ],
      });
  
      res.status(200).json({
        message: members.length ? "Fetched members successfully" : "No members found",
        members: members,
        totalMembers: members.length,
      });
    } catch (err) {
      console.error('Error fetching members:', err);
      res.status(500).json({ message: "Server error" });
    }
  };


exports.monthlyMember = async (req, res) => {
    try {
      const now = new Date();
  
      // Start of current month (e.g., April 1, 2025 00:00:00)
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
  
      // End of current month (e.g., April 30, 2025 23:59:59)
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  
      const members = await Member.find({
        gym: req.user._id,
        createdAt: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      }).sort({ createdAt: -1 });
  
      res.status(200).json({
        message: members.length
          ? "Fetched members successfully"
          : "No members registered this month",
        members: members,
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
        nextBillDate: {
          $gte: today,
          $lte: nextThreeDays,
        },
      });
  
      res.status(200).json({
        message: members.length
          ? "Fetched members successfully"
          : "No members expiring in the next 3 days.",
        members: members,
        totalMembers: members.length,
      });
  
    } catch (err) {
      console.log("Error in expiringWithin3Days:", err);
      res.status(500).json({ error: 'Server error' });
    }
  };

  exports.expiringWithin4To7Days = async (req, res) => {
    try {
      const today = new Date();
  
      const day4 = new Date();
      day4.setDate(today.getDate() + 4);
  
      const day7 = new Date();
      day7.setDate(today.getDate() + 7);
  
      const members = await Member.find({
        gym: req.user._id,
        nextBillDate: {
          $gte: day4,
          $lte: day7,
        },
      });
  
      res.status(200).json({
        message: members.length
          ? "Fetched members successfully"
          : "No members expiring between 4 to 7 days.",
        members: members,
        totalMembers: members.length,
      });
    } catch (err) {
      console.log("Error in expiringWithin4To7Days:", err);
      res.status(500).json({ error: "Server error" });
    }
  };
  