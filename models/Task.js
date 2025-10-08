const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a task title"],
      maxlength: 100,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    category: {
      type: String,
      enum: ["tasks", "errands", "chores", "random"],
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done", "skipped"],
      default: "todo",
    },
    // assignees: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
    // recurrence: {
    //   type: String,
    //   enum: ["once", "daily", "weekly"],
    //   default: "once",
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);

// what about id?

// add to model at later stage

// dueDate: {
//for one off tasks like oil changes, vet visits
//   type: Date,
//   default: null,
// },
// dueDay: {
// for weekly tasks or when recurrence === "weekly"
//   type: Number,
//   min: 0,
//   max: 6,
//   default: null,
// },

// Probably not needed since status covers this part
// completed: {
//   type: Boolean,
//   default: false,
// },

// assignmentScope: {
//   type: String,
//   enum: ["unassigned", "all", "specific"],
//   default: "unassigned",
// },
