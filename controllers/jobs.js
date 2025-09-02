const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  console.log("User ID from token:", req.user.userId);
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  res.send("Get Single Job");
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  res.send("Updated Job");
};

const deleteJob = async (req, res) => {
  res.send("Delete Job");
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };

// GET all jobs
// GET single job
// POST single job
// PATCH single job
// DELETE single job
