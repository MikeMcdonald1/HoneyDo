// routers decide WHERE to go, and controllers decide WHAT to do
const getAllJobs = async (req, res) => {
  res.send("Get All Jobs");
};

const getJob = async (req, res) => {
  res.send("Get Single Job");
};

const createJob = async (req, res) => {
  res.json(req.user);
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
