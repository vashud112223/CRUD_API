const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId, // Correct type for ObjectId reference
      ref: "Applicant", // Reference to the Applicant model
      required: true,
    },
    interviewDate: {
      type: Date, // Date type is more appropriate for dates
      required: true,
    },
    interviewerName: {
      type: String,
      required: true,
    },
  },
);

const Interview = mongoose.model("Interview", InterviewSchema);
module.exports = Interview;
