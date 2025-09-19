const User = require("../models/User");
const Household = require("../models/Household");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// Old John Smilga register
// const register = async (req, res) => {
//   const user = await User.create({ ...req.body });
//   const token = user.createJWT();
//   res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
// };

// NEW UPDATED register
const register = async (req, res) => {
  // create the user
  const user = await User.create({ ...req.body });

  // create the household
  const household = await Household.create({
    householdName: `${user.name}'s Household`,
    createdBy: user._id,
  });

  // connect the user to the household
  user.household = household._id;
  await user.save();

  // create the token
  const token = user.createJWT();

  // send back a response
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, householdId: user.household }, token });
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
