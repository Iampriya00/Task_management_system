const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentname: {
      type: String,
      required: true,
    },
    departmentDes: {
      type: String,
      required: true,
    },
    manager: {
      type: String,
      required: true,
    },
    employeeNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Department = mongoose.model("department", departmentSchema);
module.exports = Department;
