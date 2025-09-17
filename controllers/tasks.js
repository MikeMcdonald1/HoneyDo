const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllTasks = async (req, res) => {
  console.log("User ID from token:", req.user.userId);
  const tasks = await Task.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
};

const getTask = async (req, res) => {
  // destructures req to grab the authenticated user's id (req.user.userId) and the route parameter id (req.params.id), and renames it to taskId
  const {
    user: { userId },
    params: { id: taskId },
  } = req;

  // queries Mongo for a single task where _id equals taskId and createdBy equals userId
  const task = await Task.findOne({
    _id: taskId,
    createdBy: userId,
  });
  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task });
};

const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};

const updateTask = async (req, res) => {
  // grabs company and position from req.body
  // destructures req to grab the authenticated user's id (req.user.userId) and the route parameter id (req.params.id), and renames it to taskId
  const {
    body: { company, position },
    user: { userId },
    params: { id: taskId },
  } = req;

  // guardrail: if either company or position is an empty string, throw a BadRequestError with message
  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }

  // use Mongo mehtod findByIdAndUpdate to find doc by its id and update in DB
  // filter the object ( _id: taskId, createdBy: userId)
  // new: true returns post-update document, runValidators: true ensures schema rules run on updates
  const task = await Task.findByIdAndUpdate(
    { _id: taskId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  // if no task matched, throw the NotFoundError and message
  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task });
};

const deleteTask = async (req, res) => {
  // destructures req to grab the authenticated user's id (req.user.userId) and the route parameter id (req.params.id), and renames it to taskId
  const {
    body: { company, position },
    user: { userId },
    params: { id: taskId },
  } = req;

  const task = await Task.findOneAndDelete({
    _id: taskId,
    createdBy: userId,
  });
  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };

// GET all tasks
// GET single task
// POST single task
// PATCH single task
// DELETE single task
