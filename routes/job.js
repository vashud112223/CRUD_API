const express = require("express");
const router = express.Router();
const Job = require("../models/Jobs");
const authenticateJWT = require("../middleware/authMiddleware");

// POST /jobs - Add a new job position
router.post("/jobs",  authenticateJWT,async (req, res) => {
  const {title, department, description, openDate } = req.body;

  // Input validation
  if (!title || !department || !description || !openDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new job instance
    const newJob = new Job({
      title,
      department,
      description,
      openDate,
    });

    // Save the job to the database
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error: error.message });
  }
});

// GET /jobs - Retrieve a list of all job positions
router.get("/jobs", authenticateJWT, async (req, res) => {
  try {
    // Fetch all jobs from the database
    const jobs = await Job.find();

    // Respond with the list of jobs
    res.status(200).json(jobs);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ message: "Error retrieving jobs", error: error.message });
  }
});

module.exports = router;
