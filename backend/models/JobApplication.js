const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role/title is required"],
      trim: true,
    },
    link: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected", "Withdrawn"],
      default: "Applied",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: String,
      default: "",
    },
    salary: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);