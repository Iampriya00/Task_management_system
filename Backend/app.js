const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./connection/connection");

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

// Use routes
app.use(user);
app.use(task);
app.use(clock);
app.use(leave);
app.use(project);
app.use(department);

// Error Handling Middleware:
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello baby");
});


const PORT = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL;
app
  .listen(PORT, () => {
    console.log(`🚀 Server is running on: ${baseUrl}`);
  })
  .on("error", (err) => {
    console.error("Error starting the server", err);
  });
