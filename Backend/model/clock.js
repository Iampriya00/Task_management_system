const mongoose = require("mongoose");
const User = require("./user");

const clockSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    clockIn: {
      type: Date,
      required: true,
    },
    clockOut: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("clock", clockSchema);
module.exports = Attendance;
