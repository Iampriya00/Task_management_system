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

    const parsedDuedate = new Date(datedue);
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
      datedue: parsedDuedate,
      assignto,
      assignby,
    });

    await newTask.save();

    return res.status(201).json({
      message: "Task added successfully",
      task: newTask,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

router.get("/viewTaskbyUser/:id", authenticatetoken, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const tasks = await Task.find({ assignto: user.email }).populate("status");
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

router.post("/updateStatus/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const validStatuses = ["done", "pending", "working"];
    if (!validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        message: "Invalid status. Use 'done', 'pending', or 'working'.",
      });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status.toLowerCase();

    await task.save();

    return res.status(200).json({
      message: "Task status updated successfully",
      task: task,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
