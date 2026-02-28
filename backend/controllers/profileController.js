import Profile from "../model/profileModel.js";
export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id }).populate("user", "username email");
    console.log("req.user:", req.user);
    if (!profile) {
      profile = await Profile.create({ user: req.user._id });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      profile = new Profile({ user: req.user._id });
    }

    if (req.body.summary !== undefined) profile.summary = req.body.summary;
    if (req.body.skills !== undefined) profile.skills = req.body.skills;
    if (req.body.experience !== undefined) profile.experience = req.body.experience;
    if (req.body.education !== undefined) profile.education = req.body.education;
    if (req.body.resume !== undefined) profile.resume = req.body.resume;
    if (req.body.profilePhoto !== undefined) profile.profilePhoto = req.body.profilePhoto;

    await profile.save();

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addSkill = async (req, res) => {
  try {
    const { skill } = req.body;
    if (!skill) {
      return res.status(400).json({ message: "Skill is required" });
    }

    let profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      profile = new Profile({ user: req.user._id });
    }

    if (!profile.skills.includes(skill)) {
      profile.skills.push(skill);
      await profile.save();
    }

    res.json(profile.skills);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addExperience = async (req, res) => {
  try {
    const { company, role, startDate, endDate, description } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: "Company and role are required" });
    }

    let profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      profile = new Profile({ user: req.user._id });
    }

    profile.experience.push({
      company,
      role,
      startDate,
      endDate,
      description
    });

    await profile.save();

    res.json(profile.experience);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};