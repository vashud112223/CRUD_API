const express = require("express");
const router = express.Router();
const Applicant = require("../models/Applicant"); 
const Job = require("../models/Jobs"); 
const authenticateJWT = require("../middleware/authMiddleware");

// POST /applicants - Add a new applicant for a specific job
router.post("/applicants", authenticateJWT, async (req, res) => {
  const { jobId, name, email, resumeLink, status } = req.body;

  // Input validation
  if (!jobId || !name || !email || !resumeLink || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Validate jobId
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Create a new applicant instance
    const newApplicant = new Applicant({
      jobId,
      name,
      email,
      resumeLink,
      status,
    });

    // Save the applicant to the database
    const savedApplicant = await newApplicant.save();
    res.status(201).json(savedApplicant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating applicant", error: error.message });
  }
});

// GET /applicants?jobId={jobId} - Retrieve a list of all applicants for a specific job
router.get("/applicants",authenticateJWT, async (req, res) => {
  const { jobId } = req.query;

  // Input validation
  if (!jobId) {
    return res
      .status(400)
      .json({ message: "jobId query parameter is required" });
  }

  try {
    // Fetch applicants for the specified jobId
    const applicants = await Applicant.find({ jobId });

    // Check if any applicants were found
    if (applicants.length === 0) {
      return res
        .status(404)
        .json({ message: "No applicants found for the specified job" });
    }

    // Respond with the list of applicants
    res.status(200).json(applicants);
  } catch (error) {
    // Handle any errors that occur
    res
      .status(500)
      .json({ message: "Error retrieving applicants", error: error.message });
  }
});

// PATCH /applicants/:applicantId - Update the status of an applicant
router.patch("/applicants/:applicantId", authenticateJWT, async (req, res) => {
  const { applicantId } = req.params;
  const { status } = req.body;

  const validStatuses = ["Pending", "Interviewed", "Rejected", "Hired"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updatedApplicant = await Applicant.findByIdAndUpdate(
      applicantId,
      { status },
      { new: true }
    );

    if (!updatedApplicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.status(200).json(updatedApplicant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating applicant", error: error.message });
  }
});

// DELETE /applicants/:applicantId - Delete an applicant from the database
router.delete("/applicants/:applicantId", authenticateJWT,async (req, res) => {
    const { applicantId } = req.params;
  
    try {
      // Find and delete the applicant by ID
      const deletedApplicant = await Applicant.findByIdAndDelete(applicantId);
  
      // Check if the applicant was found and deleted
      if (!deletedApplicant) {
        return res.status(404).json({ message: "Applicant not found" });
      }
  
      // Respond with a success message
      res.status(200).json({ message: "Applicant deleted successfully", deletedApplicant });
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: "Error deleting applicant", error: error.message });
    }
  });

module.exports = router;
