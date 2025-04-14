const mongoose = require("mongoose");

// Define schema for Membership Plan
const MembershipSchema = new mongoose.Schema(
  {
    months: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    gym: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GymUser",
      required: true,
    },
  },
  { timestamps: true }
);

// Export the Membership model
module.exports = mongoose.model("Membership", MembershipSchema);
