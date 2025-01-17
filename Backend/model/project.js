const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectname: {
      type: String,
      required: true,
    },
    projectdescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("project", projectSchema);
module.exports = Project;
