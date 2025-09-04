const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnautheticatedError } = require("../errors/unauthenticated");

const auth = async (req, res, next) => {
  // check for header for authorization one, does it start with Bearer
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnautheticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    const user = User.findById(payload.id).select("-password");
    req.user = user;

    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnautheticatedError("Authentication invalid");
  }
};

module.exports = auth;
