const router = require("express").Router();
const Leave = require("../model/leave");
const authenticatetoken = require("./userAuth");

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
    });

    await leave.save();
    return res.status(201).json({ message: "Apply successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/viewAllLeaves", async (req, res) => {
  try {
    const allLeaves = await Leave.find().populate(
      "userId",
      "profileImg username jobtitle email"
    );

    if (!allLeaves || allLeaves.length === 0) {
      return res.status(404).json({ message: "Attendance records not found" });
    }

    return res.status(200).json(allLeaves);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post;
module.exports = router;
