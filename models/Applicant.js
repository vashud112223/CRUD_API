const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId, // Correct type for ObjectId reference
      ref: "Job", // Reference to Job model
      required: true, // Usually, a foreign key should be required
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^([\w.%+-]+)@([\w-]+\.)+[A-Z|a-z]{2,}$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      },
    },
    resumeLink: {
      type: String,
      required: true,
    },
    status: {
      type: String, // Changed to String for better status representation
      enum: ["Pending", "Interviewed", "Rejected", "Hired"], // Restrict to predefined values
      required: true,
    },
  },
);

const Applicant = mongoose.model("Applicant", ApplicantSchema);
module.exports = Applicant;
