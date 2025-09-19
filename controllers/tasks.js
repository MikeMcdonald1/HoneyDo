const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// OLD John Smilga getAllTasks
// const getAllTasks = async (req, res) => {
//   const tasks = await Task.find({ createdBy: req.user.userId }).sort(
//     "createdAt"
//   );
//   res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
// };

// NEW UPDATED getAllTasks
const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ householdId: req.user.householdId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
};

// OLD John Smilga getTask
// const getTask = async (req, res) => {
//   const {
//     user: { userId },
//     params: { id: taskId },
//   } = req;

//   const task = await Task.findOne({
//     _id: taskId,
//     createdBy: userId,
//   });
//   if (!task) {
//     throw new NotFoundError(`No task with id ${taskId}`);
//   }
//   res.status(StatusCodes.OK).json({ task });
// };

// NEW UPDATED getTask
const getTask = async (req, res) => {
  const {
    user: { userId, householdId },
    params: { id: taskId },
  } = req;

  const task = await Task.findOne({
    _id: taskId,
    createdBy: userId,
    householdId: householdId,
  });

  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task });
};

// Old John Smilga createTask
// const createTask = async (req, res) => {
//   req.body.createdBy = req.user.userId;
//   const task = await Task.create(req.body);
//   res.status(StatusCodes.CREATED).json({ task });
// };

// NEW UPDATED createTask
const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  req.body.householdId = req.user.householdId;
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};

// Old John Smilga updateTask
// const updateTask = async (req, res) => {
//   const {
//     body: { company, position },
//     user: { userId },
//     params: { id: taskId },
//   } = req;

//   if (company === "" || position === "") {
//     throw new BadRequestError("Company or Position fields cannot be empty");
//   }

//   const task = await Task.findByIdAndUpdate(
//     { _id: taskId, createdBy: userId },
//     req.body,
//     { new: true, runValidators: true }
//   );

//   if (!task) {
//     throw new NotFoundError(`No task with id ${taskId}`);
//   }
//   res.status(StatusCodes.OK).json({ task });
// };

// NEW UPDATED updateTask
const updateTask = async (req, res) => {
  const {
    body,
    user: { userId, householdId },
    params: { id: taskId },
  } = req;

  if (body.title === "") {
    throw new BadRequestError("Title field cannot be empty");
  }

  const task = await Task.findByIdAndUpdate(
    { _id: taskId, createdBy: userId, householdId: householdId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task });
};

// Old John Smilga deleteTask
// John,why send a body in a delete request??
// const deleteTask = async (req, res) => {
//   const {
//     body: { company, position },
//     user: { userId },
//     params: { id: taskId },
//   } = req;

//   const task = await Task.findOneAndDelete({
//     _id: taskId,
//     createdBy: userId,
//   });
//   if (!task) {
//     throw new NotFoundError(`No task with id ${taskId}`);
//   }
//   res.status(StatusCodes.OK).send();
// };

// NEW UPDATED deleteTask
const deleteTask = async (req, res) => {
  const {
    user: { userId, householdId },
    params: { id: taskId },
  } = req;

  const task = await Task.findOneAndDelete({
    _id: taskId,
    createdBy: userId,
    householdId: householdId,
  });

  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  res.status(StatusCodes.OK).json();
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
