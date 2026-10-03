const express = require("express");
const JobApplication = require("../models/JobApplication");

const router = express.Router();

// ── GET all jobs (with optional ?status= and ?search=) ─────
router.get("/", async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (search) {
      filter.company = { $regex: search, $options: "i" };
    }

    const jobs = await JobApplication.find(filter).sort({ appliedAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET single job by id ────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const job = await JobApplication.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST new job ────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const job = new JobApplication(req.body);
    const saved = await job.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── UPDATE job (status, notes, anything) ────────────────────
router.put("/:id", async (req, res) => {
  try {
    const updated = await JobApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Job not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── DELETE job ──────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await JobApplication.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Job not found" });
    res.json({ message: "Job deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;