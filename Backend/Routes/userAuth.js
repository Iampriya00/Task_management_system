const jwt = require("jsonwebtoken");

const authenticatetoken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    return res.status(401).json({ message: "Authentication token required" });
  }
  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};
module.exports = authenticatetoken;
