const router = require("express").Router();
const Task = require("../model/task");
const User = require("../model/user");
const authenticatetoken = require("./userAuth");

router.post("/addNewTask", async (req, res) => {
  try {
    const { taskdetails, project, datedue, assignto, assignby } = req.body;

    if (!taskdetails || !project || !datedue || !assignto || !assignby) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Parse the string date to Date object if needed
    const parsedDuedate = new Date(datedue); // Ensure it's a valid Date object

    // Check for invalid date format
    if (isNaN(parsedDuedate)) {
      return res.status(400).json({ message: "Invalid due date format" });
    }

    const assignee = await User.findOne({ email: assignto });
    const assignor = await User.findOne({ email: assignby });

    if (!assignee) {
      return res.status(404).json({ message: "Assignee user not found" });
    }

    if (!assignor) {
      return res.status(404).json({ message: "Assignor user not found" });
    }

    if (assignor.role !== "admin") {
      return res.status(403).json({ message: "Only admins can assign tasks" });
    }

    const newTask = new Task({
      taskdetails,
      project,
      datedue: parsedDuedate, // Ensure you're saving it as a Date
      assignto,
      assignby,
    });

    console.log("New task to save:", newTask);

    await newTask.save();

    return res
      .status(201)
      .json({ message: "Task added successfully", task: newTask });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/viewTaskbyUser/:id", authenticatetoken, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const tasks = await Task.find({ assignto: user.email });

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    return res.status(200).json({ tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});
module.exports = router;
