const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// generate the joinCode
const genJoinCode = (len = 6) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789";
  return Array.from(
    { length: len },
    () => alphabet[Math.floor(Math.random() * alphabet.length)]
  ).join("");
};

const HouseholdSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide household name"],
      maxlength: 100,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    joinCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

HouseholdSchema.pre("validate", function () {
  if (!this.joinCode) this.joinCode = genJoinCode(6);
});

module.exports = mongoose.model("Household", HouseholdSchema);
