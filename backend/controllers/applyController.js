import Application from '../model/applyModel.js'
import Job from '../model/jobModel.js'
import Profile from "../model/profileModel.js";
export const applyJob = async (req, res) => {
  try {
    const { jobId, name, number, email, description, profileResume } = req.body;
    let resume = req.file?.path || profileResume || profile.resume;
    if (!resume) {
        return res.status(400).json({ message: "Resume is required" });
    }
      resume = resume.replace(/\\/g, "/");
    const jobExists = await Job.findById(jobId);
    if (!jobExists) {
      return res.status(404).json({ message: "Job not found" });
    }
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const existingApplication = await Application.findOne({ jobId, email });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job." });
    }

    const application = new Application({
      jobId,
      profileId: profile._id,
      name,
      number,
      email,
      description,
      resume
    });

    await application.save();

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (err) {
    res.status(500).json({ message: err.message, error: err.message });
  }
};
export const getApplicants = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId", "title company location")
      .populate("profileId", "resume skills education summary");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message, error: err.message });
  }
};
// controller
export const checkApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const application = await Application.findOne({ jobId, email });

    res.json({ applied: !!application });
  } catch (err) {
    res.status(500).json({ message: err.message, error: err.message });
  }
};
export const getSingleApplicant = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Application.findById(id)
      .populate("jobId")
      .populate("profileId");

    res.status(200).json({
      Result: data
    });

  } catch (err) {
    res.status(400).send(err);
  }
};