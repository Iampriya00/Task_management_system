const router = require("express").Router();
const Leave = require("../model/leave");
const User = require("../model/user");
const authenticatetoken = require("./userAuth");

// Apply leave route
router.post("/applyLeave", authenticatetoken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { leavetype, startDate, endDate, reason } = req.body;

    // Validate required fields
    if (!leavetype || !startDate || !endDate || !reason) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const leave = new Leave({
      leavetype,
      startDate,
      endDate,
      reason,
      userId, // Ensure you're saving the userId properly
    });

    await leave.save();
    return res.status(201).json({ message: "Leave application successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// View all leaves route
router.get("/viewAllLeaves", authenticatetoken, async (req, res) => {
  try {
    const allLeaves = await Leave.find();

    if (!allLeaves || allLeaves.length === 0) {
      return res.status(404).json({ message: "No leave records found" });
    }

    return res.status(200).json(allLeaves);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update leave status route
router.post("/updateLeaveStatus/:id", authenticatetoken, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status || !id) {
      return res.status(400).json({ message: "Status and ID are required" });
    }

    const validStatuses = ["approved", "pending", "rejected"];
    if (!validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        message: "Invalid status. Use 'approved', 'pending', or 'rejected'.",
      });
    }

    const leave = await Leave.findById(id);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = status.toLowerCase();
    await leave.save();

    return res.status(200).json({
      message: "Leave status updated successfully",
      leave,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// View leaves by user route
router.get("/viewLeavebyUser/:id", authenticatetoken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const leaves = await Leave.find({ userId: id }).populate("status");

    if (!leaves || leaves.length === 0) {
      return res
        .status(404)
        .json({ message: "No leave records found for this user" });
    }

    return res.status(200).json(leaves);
  } catch (error) {
    console.error("Error fetching leaves:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
