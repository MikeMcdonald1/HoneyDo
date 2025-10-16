const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllTasks = async (req, res) => {
  // const tasks = await Task.find({ createdBy: req.user.userId }).sort(
  const tasks = await Task.find({ householdId: req.user.householdId }).sort(
    "createdAt"
  );
  console.log(req.user.householdId);

  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
};

const getTask = async (req, res) => {
  const {
    // user: { userId },
    user: { householdId },
    params: { id: taskId },
  } = req;

  const task = await Task.findOne({
    _id: taskId,
    // createdBy: userId,
    householdId,
  });
  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task });
};

const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  req.body.householdId = req.user.householdId;
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};

const updateTask = async (req, res) => {
  const {
    // body: { company, position },
    // user: { userId },
    user: { householdId },
    params: { id: taskId },
  } = req;

  // if (company === "" || position === "") {
  //   throw new BadRequestError("Company or Position fields cannot be empty");
  // }

  const task = await Task.findOneAndUpdate(
    // { _id: taskId, createdBy: userId },
    { _id: taskId, householdId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task });
};

// Should I change NotFoundError message to "task doesn't belong to user" or something?

const deleteTask = async (req, res) => {
  const {
    // body: { company, position },
    // user: { userId },
    user: { householdId },
    params: { id: taskId },
  } = req;

  const task = await Task.findOneAndDelete({
    _id: taskId,
    // createdBy: userId,
    householdId,
  });
  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
