const User = require("../models/User");
const Household = require("../models/Household");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const household = await Household.create({
    name: `${user.name}'s household`,
    createdBy: user._id,
  });
  user.householdId = household._id;
  user.role = "owner";
  await user.save();
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({
      user: { name: user.name },
      token,
      household: { name: household.name, joinCode: household.joinCode },
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
