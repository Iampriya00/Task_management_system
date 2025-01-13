const router = require("express").Router();
const Leave = require("../model/leave");
const authenticatetoken = require("./userAuth");

// Apply for leave
router.post("/applyLeave", authenticatetoken, async (req, res) => {
  try {
    const { leavetype, startDate, endDate, reason } = req.body;

    if (!leavetype || !startDate || !endDate || !reason) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const leave = new Leave({
      leavetype,
      startDate,
      endDate,
      reason,
      userId: req.user._id, // Assuming you're saving the userId as well
    });

    await leave.save();
    return res.status(201).json({ message: "Leave application successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// View all leaves
router.get("/viewAllLeaves", authenticatetoken, async (req, res) => {
  try {
    const allLeaves = await Leave.find().populate(
      "userId",
      "profileImg username jobtitle email"
    );

    if (!allLeaves || allLeaves.length === 0) {
      return res.status(404).json({ message: "No leave records found" });
    }

    return res.status(200).json(allLeaves);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update leave status
router.post("/updateStatus", authenticatetoken, async (req, res) => {
  try {
    const { status, _id } = req.body;

    if (!status || !_id) {
      return res.status(400).json({ message: "Status and ID are required" });
    }

    // Validate the status
    const validStatuses = ["approve", "pending", "rejected"];
    if (!validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        message: "Invalid status. Use 'approve', 'pending', or 'rejected'.",
      });
    }

    // Find the leave by _id
    const leave = await Leave.findById(_id); // Fix here
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    // Update the status
    leave.status = status.toLowerCase();
    await leave.save();

    // Return the updated leave
    return res.status(200).json({
      message: "Leave status updated successfully",
      leave: leave,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
