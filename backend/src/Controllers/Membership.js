const Membership = require("../Models/Membershiop"); // make sure file name is correct

exports.AddMembership = async (req, res) => {
  try {
    const { months, price } = req.body;

    // Check if the same membership already exists for this gym
    const existing = await Membership.findOne({ gym: req.user._id, months });

    if (existing) {
      existing.price = price;
      await existing.save();

      return res.status(200).json({
        success: true,
        message: "Membership updated successfully",
        membership: existing
      });
    }

    // Create new membership
    const newMembership = await Membership.create({
      gym: req.user._id,
      months,
      price
    });

    return res.status(201).json({
      success: true,
      message: "Membership added successfully",
      membership: newMembership
    });

  } catch (error) {
    console.error("AddMembership Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};








exports.getmembership = async (req, res) => {
  try {
    const loggedInId = req.user._id;

    const memberships = await Membership.find({ gym: loggedInId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Memberships fetched successfully",
      count: memberships.length,
      memberships
    });

  } catch (err) {
    console.error("GetMembership Error:", err);
    res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};
