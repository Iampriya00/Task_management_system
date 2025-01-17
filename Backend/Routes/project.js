const router = require("express").Router();
const Project = require("../model/project");
const authenticateToken = require("./userAuth");

router.post("/addNewProject", authenticateToken, async (req, res) => {
  try {
    const { projectname, projectdescription } = req.body;

    if (!projectname || !projectdescription) {
      return res
        .status(400)
        .json({ message: "Project name and description are required" });
    }

    const newProject = new Project({
      projectname,
      projectdescription,
    });
    const savedProject = await newProject.save();

    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/viewAllProject", authenticateToken, async (req, res) => {
  try {
    const project = await Project.find().sort({ createdAt: -1 });
    return res.status(200).json(project);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/deleteProject/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
