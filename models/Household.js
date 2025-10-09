const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HouseholdSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide household title"],
      maxlength: 100,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
  },
  // timestamps: true adds createdAt and updatedAt to the schema
  { timestamps: true }
);

// Research Join Codes
// How to implement this? New user creates new household || New user joins existing household with join code
// Bigger Picture: Can existing user join multiple households? Can existing user create multiple households?
