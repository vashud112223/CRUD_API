const express = require("express");
const router = express.Router();
const Interview = require("../models/Interviews"); 
const authenticateJWT = require("../middleware/authMiddleware");

// POST /interviews - Schedule an interview
router.post("/interviews", authenticateJWT,async (req, res) => {
    const { applicantId, interviewDate, interviewerName } = req.body;
  
    // Input validation
    if (!applicantId || !interviewDate || !interviewerName) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    // Ensure interviewDate is a valid date
    if (isNaN(Date.parse(interviewDate))) {
      return res.status(400).json({ message: "Invalid interview date" });
    }
  
    try {
      // Create a new interview instance
      const newInterview = new Interview({
        applicantId,
        interviewDate: new Date(interviewDate), // Convert to Date object
        interviewerName,
      });
  
      // Save the interview to the database
      const savedInterview = await newInterview.save();
      res.status(201).json(savedInterview);
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: "Error scheduling interview", error: error.message });
    }
  });

// GET /interviews - Fetch interview details for a specific applicant
router.get("/interviews", authenticateJWT, async (req, res) => {
  const { applicantId } = req.query; // Get applicantId from query parameters

  if (!applicantId) {
    return res.status(400).json({ message: "Applicant ID is required" });
  }

  try {
    const interviews = await Interview.find({ applicantId });

    if (interviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No interviews found for this applicant" });
    }

    res.status(200).json(interviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving interviews", error: error.message });
  }
});

module.exports = router;
