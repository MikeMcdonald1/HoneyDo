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
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null, // for unassigned tasks
      // required: [true, "Please provide the user that this task is assigned to"],
    },
    householdId: {
      type: mongoose.Types.ObjectId,
      ref: "Household",
      required: [true, "Household is required"],
    },
    dueDate: {
      //for one off tasks like oil changes, vet visits
      type: Date,
      default: null,
    },
    dueDay: {
      // for weekly tasks or when recurrence === "weekly"
      type: Number,
      min: 0,
      max: 6,
      default: null,
    },
    recurrence: {
      type: String,
      enum: ["none", "daily", "weekly", "monthly"],
      default: "none",
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
