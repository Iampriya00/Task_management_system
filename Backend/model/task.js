const mongoose = require("mongoose");
const User = require("./user");
const { Schema } = mongoose;

const taskSchema = new Schema({
  taskdetails: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  datecreate: {
    type: Date,
    default: Date.now,
  },
  datedue: {
    type: Date,
    required: true,
  },
  assignto: {
    type: String,
    ref: User,
    required: true,
  },
  assignby: {
    type: String,
    ref: User,
    required: true,
  },
  status: {
    type: String,
    enum: ["done", "pending", "working"],
    required: true,
    default: "Pending",
  },
});

module.exports = mongoose.model("Task", taskSchema);
