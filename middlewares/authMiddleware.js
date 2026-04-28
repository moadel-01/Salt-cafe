const jwt = require("jsonwebtoken");

function authMidd(req, res, next) {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No Token Provided" });
    }

    const data = jwt.verify(token, process.env.PRIVATE_KEY);

    req.user = data;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = authMidd;
