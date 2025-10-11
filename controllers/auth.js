const User = require("../models/User");
const Household = require("../models/Household");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

const register = async (req, res) => {
  const { joinCode, ...userBody } = req.body;
  const user = await User.create({ ...userBody });

  let household = null;

  // if there is a joinCode, try to find existing household, if found assign household to newly created user
  // otherwise create household
  if (joinCode) {
    household = await Household.findOne({
      joinCode: joinCode,
    });
    if (!household) {
      throw new NotFoundError(`No household with joinCode ${joinCode}`);
    }
    user.role = "member";
  } else {
    household = await Household.create({
      name: `${user.name}'s household`,
      createdBy: user._id,
    });
    user.role = "owner";
  }

  user.householdId = household._id;
  await user.save();
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
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
  // res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
  let household = null;
  if (user.householdId) {
    household = await Household.findById(user.householdId).lean();
  }

  const householdResponse = household
    ? { name: household.name, joinCode: household.joinCode }
    : null;

  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name }, token, household: householdResponse });
};

module.exports = { register, login };
