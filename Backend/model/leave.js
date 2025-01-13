const mongoose = require("mongoose");
const User = require("./user");

const leaveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  leavetype: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["approved", "pending", "rejected"],
    required: true,
    default: "pending",
  },
});
const Leave = mongoose.model("leave", leaveSchema);
module.exports = Leave;
