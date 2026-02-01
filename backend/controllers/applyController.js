import Application from '../model/applyModel.js'
import Job from '../model/jobModel.js'
export const applyJob=async (req, res) => {
  try {
    const { jobId, name,number, email, description } = req.body;
    const resume = req.file?.path;
    if (!resume) {
      return res.status(400).json({ message: "Resume is required" });
    }
    
    const jobExists = await Job.findById(jobId);
    if (!jobExists) {
      return res.status(404).json({ message: "Job not found" });
    }
    const existingApplication = await Application.findOne({ jobId, email });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job." });
    }
    const application = new Application({ jobId, name, number,email, description,resume, });
    await application.save();

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getApplicants= async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId", "title company location"); 
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
};
