const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentname: {
      type: String,
      required: true,
      trim: true, // Trims spaces from input
    },
    departmentDes: {
      type: String,
      required: true,
      trim: true, // Trims spaces from input
    },
    manager: {
      type: String,
      required: true,
      trim: true, // Trims spaces from input
    },
    employeeNumber: {
      type: String,
      required: true,
      min: [1, "Employee number must be at least 1"], // Enforces minimum of 1 employee
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Department = mongoose.model("department", departmentSchema);

module.exports = Department;
