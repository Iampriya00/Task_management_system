const router = require("express").Router();
const authenticateToken = require("./userAuth");
const Department = require("../model/department");

// Route to add a new department
router.post("/addDepartment", authenticateToken, async (req, res) => {
  try {
    const { departmentname, departmentDes, manager, employeeNumber } = req.body;

    // Ensure that all fields are provided
    if (!departmentname || !departmentDes || !manager || !employeeNumber) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Create a new department object
    const newDepartment = new Department({
      departmentname,
      departmentDes,
      manager,
      employeeNumber,
    });

    // Save the department to the database
    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
  } catch (error) {
    console.error("Error saving department:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to view all departments
router.get("/viewAllDepartment", authenticateToken, async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });

    // If no departments are found
    if (!departments || departments.length === 0) {
      return res.status(404).json({ message: "No departments found" });
    }

    return res.status(200).json(departments);
  } catch (error) {
    console.log("Error fetching departments:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to delete a department by ID
router.delete("/deleteDepartment/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the ID is valid before attempting to delete
    if (!id) {
      return res.status(400).json({ message: "Department ID is required" });
    }

    const department = await Department.findByIdAndDelete(id);

    // If the department is not found
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
