const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticatetoken = require("./userAuth");

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, phone, profileImg, jobtitle, salary } =
      req.body;

    // Hash the password
    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters long" });
    }
    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (password.length <= 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }
    if (!profileImg) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    if (!jobtitle) {
      return res.status(400).json({ message: "Job title is required" });
    }
    if (!salary) {
      return res.status(400).json({ message: "Salary is required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const user = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      profileImg,
      jobtitle,
      salary,
    });

    // Save the user to the database
    await user.save();

    // Send success response
    return res.status(201).json({ message: "Sign-up successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ensure email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user by email
    const existEmail = await User.findOne({ email });
    if (!existEmail) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    // Check if the hashed password exists
    if (!existEmail.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the plaintext password with the hashed password
    const validPassword = await bcrypt.compare(password, existEmail.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const authClaim = {
      username: existEmail.username,
      id: existEmail._id,
    };
    const token = jwt.sign(authClaim, process.env.JWT_TOKEN, {
      expiresIn: "10d",
    });

    // Return the response
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: existEmail._id,
        email: existEmail.email,
        username: existEmail.username,
        role: existEmail.role,
      },
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/alluser", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json({ status: "Success", data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/allemployees", authenticatetoken, async (req, res) => {
  try {
    const employees = await User.find({ role: "user" }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ status: "Success", data: employees });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/userInformation", authenticatetoken, async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/empInformation/:id", authenticatetoken, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/deleteEmp/:id", authenticatetoken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);

    // Respond with internal server error
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/updateinformation", authenticatetoken, async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }

    const { username, phone, profileImg, jobtitle, salary } = req.body;

    if (!username && !phone && !profileImg && !jobtitle && !salary) {
      return res.status(400).json({
        message: "At least one field is required",
      });
    }

    const updateUser = await User.findByIdAndUpdate(
      id,
      { username, phone, profileImg, jobtitle, salary },
      { new: true }
    ).select("-password");

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with updated user details
    return res.status(200).json({
      message: "User details updated successfully",
      user: updateUser,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error updating user information:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post;
module.exports = router;
