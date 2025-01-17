const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./connection/connection");
const user = require("./Routes/user");
const task = require("./Routes/task");
const clock = require("./Routes/clock");
const leave = require("./Routes/leave");
const project = require("./Routes/project");

app.use(cors());
app.use(express.json());

app.use(user);
app.use(task);
app.use(clock);
app.use(leave);
app.use(project);

app.get("/", (res) => {
  res.send("Hello baby");
});

const PORT = process.env.PORT || 3000;
app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting the server", err);
  });
