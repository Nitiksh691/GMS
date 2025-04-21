const Membership = require("../Models/Membership"); // Ensure the filename is correct

exports.AddMembership = async (req, res) => {
  try {
    const { months, price } = req.body;

    const existingMembership = await Membership.findOne({ gym: req.gym._id, months });

    if (existingMembership) {
      existingMembership.price = price;
      await existingMembership.save();

      return res.status(200).json({
        success: true,
        message: "Membership updated successfully",
        membership: existingMembership,
      });
    } else {
      const newMembership = new Membership({
        months,
        price,
        gym: req.gym._id,
      });

      await newMembership.save();

      return res.status(201).json({
        success: true,
        message: "Membership added successfully",
        membership: newMembership,
      });
    }
  } catch (err) {
    console.log("Add Membership Error:", err);
    return res.status(500).json({ success: false, error: "Server Error" });
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
