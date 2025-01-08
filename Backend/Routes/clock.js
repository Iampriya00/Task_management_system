const router = require("express").Router();
const clock = require("../model/clock");
const authenticatetoken = require("./userAuth");

router.post("/clock-in", authenticatetoken, async (req, res) => {
  const userId = req.user.id;
  const clockInTime = new Date();

  try {
    const lastRecord = await clock.findOne({
      userId: userId,
      clockOut: null,
    });

    if (lastRecord) {
      return res.status(400).json({ message: "You are already clocked in." });
    }

    const newClockRecord = new clock({
      userId: userId,
      clockIn: clockInTime,
    });

    await newClockRecord.save();

    res.json({ message: `Clocked in at ${clockInTime}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while clocking in." });
  }
});

router.post("/clock-out", authenticatetoken, async (req, res) => {
  const userId = req.user.id;
  const clockOutTime = new Date();

  try {
    const lastRecord = await clock.findOne({
      userId: userId,
      clockOut: null,
    });

    if (!lastRecord) {
      return res.status(400).json({ message: "You need to clock in first." });
    }

    lastRecord.clockOut = clockOutTime;
    await lastRecord.save();

    res.json({ message: `Clocked out at ${clockOutTime}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while clocking out." });
  }
});

router.get("/empAttendance", authenticatetoken, async (req, res) => {
  try {
    const { id } = req.user.id;

    const attendance = await clock
      .find({ employeeId: id })
      .sort({ clockIn: -1 });

    if (!attendance || attendance.length === 0) {
      return res.status(404).json({ message: "Attendance records not found" });
    }

    return res.status(200).json(attendance);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/empAttendace/:id", authenticatetoken, async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await clock.find({ userId: id });
    if (!attendance || attendance.length === 0) {
      return res.status(404).json({ message: "Attendance records not found" });
    }
    return res.status(200).json(attendance);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while clocking out." });
  }
});

module.exports = router;
