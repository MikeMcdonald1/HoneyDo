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
    householdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Household",
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
    // assignedTo: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    //   },
    // ],
    // comment: {
    //   type: String,
    //   maxlength: 1000,
    //   trim: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
