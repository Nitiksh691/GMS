const mongoose = require("mongoose");

// Define schema for Gym Member
const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNo: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    membership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membership",
      required: true,
    },
    gym: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GymUser",
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    lastPayment: {
      type: Date,
      default: Date.now,
    },
    nextBillDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Export the Member model
module.exports = mongoose.model("Member", MemberSchema);
