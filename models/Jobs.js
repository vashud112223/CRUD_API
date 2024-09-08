const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    openDate: {
      type: Date, // Use Date type for storing dates
      required: true,
    },
  },
);

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
