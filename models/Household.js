const mongoose = require("mongoose");

const HouseholdSchema = new mongoose.Schema({
  householdName: {
    type: String,
    required: [true, "Please provide a household name"],
    trim: true,
  },
  //   joinCode: {
  //     type: String,
  //     unique: true,
  //     sparse: true,
  //   },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Household", HouseholdSchema);
