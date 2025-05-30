const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    profileImg: {
      type: String,
      default: "",
    },
    jobtitle: {
      type: String,
      default: "",
    },
    salary: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
