const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const connectToDatabase = require("./connection/connection");
connectToDatabase();

// Import routes
const user = require("./Routes/user");
const task = require("./Routes/task");
const clock = require("./Routes/clock");
const leave = require("./Routes/leave");
const project = require("./Routes/project");
const department = require("./Routes/department");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", user);
app.use("/api/tasks", task);
app.use("/api/clock", clock);
app.use("/api/leaves", leave);
app.use("/api/projects", project);
app.use("/api/departments", department);

// Root route
app.get("/", (req, res) => {
  res.send("Hello baby");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on: ${PORT}`);
});
