import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import Footer from "../Footer";
import { useNavigate } from "react-router";
import Navbar from '../Navbar';
import axios from "axios";
import Cookies from "js-cookie";
import { FiUser, FiMail, FiBriefcase, FiBook, FiAward, FiLogOut, FiEdit2, FiPlus, FiX, FiFileText } from "react-icons/fi";

const Accounts = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // Modal States
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [summaryText, setSummaryText] = useState("");

  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [expData, setExpData] = useState({ company: "", role: "", startDate: "", endDate: "", description: "" });

  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [eduData, setEduData] = useState({ institution: "", degree: "", startYear: "", endYear: "" });

  const navigate = useNavigate();

  const fetchProfile = async () => {
    const token = Cookies.get("jwt_token");
    if (!token) {
      setProfileLoading(false);
      return;
    }
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/profile`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
      if (res.data?.summary) setSummaryText(res.data.summary);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else if (!loading) {
      setProfileLoading(false);
    }
  }, [user, loading]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const goToLoginPage = () => {
    navigate("/");
  };

  const getToken = () => Cookies.get("jwt_token");

  // Handlers
  const handleSaveSummary = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, { summary: summaryText }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setIsSummaryModalOpen(false);
      fetchProfile();
    } catch (err) {
      console.error("Failed to update summary UI", err);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/profile/skill`, { skill: newSkill }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setNewSkill("");
      setIsSkillModalOpen(false);
      fetchProfile();
    } catch (err) {
      console.error("Failed to add skill", err);
    }
  };

  const handleAddExperience = async () => {
    if (!expData.company || !expData.role) return;
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/profile/experience`, expData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setExpData({ company: "", role: "", startDate: "", endDate: "", description: "" });
      setIsExpModalOpen(false);
      fetchProfile();
    } catch (err) {
      console.error("Failed to add experience", err);
    }
  };

  const handleAddEducation = async () => {
    if (!eduData.institution || !eduData.degree) return;
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/profile/education`, eduData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setEduData({ institution: "", degree: "", startYear: "", endYear: "" });
      setIsEduModalOpen(false);
      fetchProfile();
    } catch (err) {
      console.error("Failed to add education", err);
    }
  };

  if (loading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-700 text-lg mb-4">You are not logged in.</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition" onClick={goToLoginPage}>
          Go to Login Page
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col relative">
      <Navbar />

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 flex flex-col py-12 md:px-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left Column: User Card & Summary */}
          <div className="md:col-span-1 space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <div className="relative z-10">
                <div className="w-32 h-32 mx-auto bg-white rounded-full p-2 shadow-lg mb-4 flex items-center justify-center">
                  {profile?.profilePhoto ? (
                    <img src={profile.profilePhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-5xl font-bold uppercase">
                      {user.username.charAt(0)}
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
                <div className="flex items-center justify-center text-gray-500 mt-2 space-x-2">
                  <FiMail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="mt-8 w-full flex items-center justify-center space-x-2 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition duration-200 cursor-pointer"
              >
                <FiLogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FiUser className="w-5 h-5 mr-2 text-indigo-500" />
                  About Me
                </h3>
                <button onClick={() => { setIsSummaryModalOpen(true); setSummaryText(profile?.summary || ""); }} className="text-gray-400 hover:text-indigo-600 transition">
                  <FiEdit2 className="w-4 h-4" />
                </button>
              </div>
              {profile && profile.summary ? (
                <p className="text-gray-600 leading-relaxed text-sm">
                  {profile.summary}
                </p>
              ) : (
                <p className="text-gray-400 italic text-sm">No summary provided.</p>
              )}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FiAward className="w-5 h-5 mr-2 text-indigo-500" />
                  Skills
                </h3>
                <button onClick={() => setIsSkillModalOpen(true)} className="text-gray-400 hover:text-indigo-600 transition">
                  <FiPlus className="w-5 h-5" />
                </button>
              </div>
              {profile && profile.skills && profile.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full border border-indigo-100 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm">No skills added yet.</p>
              )}
            </div>

            {/* Resume */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FiFileText className="w-5 h-5 mr-2 text-indigo-500" />
                  Resume
                </h3>
                <label className="text-indigo-600 hover:text-indigo-800 transition cursor-pointer flex items-center space-x-1 text-sm font-medium">
                  <FiPlus className="w-4 h-4" />
                  <span>Update</span>
                  <input
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={async (e) => {
                      const file = e.currentTarget.files[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append("resume", file);
                      try {
                        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/profile/resume`, formData, {
                          headers: { Authorization: `Bearer ${getToken()}`, "Content-Type": "multipart/form-data" }
                        });
                        fetchProfile();
                      } catch (err) {
                        console.error("Failed to upload resume", err);
                      }
                    }}
                  />
                </label>
              </div>
              {profile && profile.resume ? (
                <div className="bg-indigo-50 p-4 rounded-xl flex items-center justify-between border border-indigo-100">
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                      <FiFileText className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium text-gray-800 truncate">
                      resume.pdf
                    </p>
                  </div>
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}/${profile.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold whitespace-nowrap"
                  >
                    View
                  </a>
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm">No resume uploaded yet.</p>
              )}
            </div>
          </div>

          {/* Right Column: Experience and Education */}
          <div className="md:col-span-2 space-y-8">

            {/* Experience */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FiBriefcase className="w-6 h-6 mr-3 text-indigo-500" />
                  Experience
                </h3>
                <button onClick={() => setIsExpModalOpen(true)} className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition">
                  <FiPlus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
              {profile && profile.experience && profile.experience.length > 0 ? (
                <div className="space-y-8">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="relative pl-8 border-l-2 border-indigo-100 last:border-0 pb-2">
                      <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-[9px] top-1.5 border-4 border-white shadow-sm"></div>
                      <h4 className="text-xl font-bold text-gray-800">{exp.role}</h4>
                      <p className="text-indigo-600 font-medium text-lg mt-1">{exp.company}</p>
                      <p className="text-sm text-gray-500 mt-1 mb-3">
                        {exp.startDate ? new Date(exp.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'Unknown'}
                        {" "} - {" "}
                        {exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'Present'}
                      </p>
                      {exp.description && (
                        <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    <FiBriefcase className="w-10 h-10 text-gray-300" />
                  </div>
                  <h4 className="text-gray-800 font-medium text-lg mb-1">No Experience Listed</h4>
                  <p className="text-gray-500">Add your work experience to stand out.</p>
                </div>
              )}
            </div>

            {/* Education */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FiBook className="w-6 h-6 mr-3 text-indigo-500" />
                  Education
                </h3>
                <button onClick={() => setIsEduModalOpen(true)} className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition">
                  <FiPlus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
              {profile && profile.education && profile.education.length > 0 ? (
                <div className="space-y-6">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 transition hover:shadow-md">
                      <h4 className="text-xl font-bold text-gray-800">{edu.degree}</h4>
                      <p className="text-indigo-600 font-medium text-lg mt-1">{edu.institution}</p>
                      <p className="text-sm text-gray-500 mt-2 mb-2 bg-white inline-block px-3 py-1 rounded-full border border-gray-200">
                        {edu.startYear || 'Unknown'} - {edu.endYear || 'Present'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    <FiBook className="w-10 h-10 text-gray-300" />
                  </div>
                  <h4 className="text-gray-800 font-medium text-lg mb-1">No Education Listed</h4>
                  <p className="text-gray-500">Showcase your academic background.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />

      {/* MODALS */}

      {/* Summary Modal */}
      {isSummaryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative">
            <button onClick={() => setIsSummaryModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <FiX className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Edit Summary</h3>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
              placeholder="Write a brief summary about yourself..."
              value={summaryText}
              onChange={(e) => setSummaryText(e.target.value)}
            />
            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => setIsSummaryModalOpen(false)} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition cursor-pointer">Cancel</button>
              <button onClick={handleSaveSummary} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow transition cursor-pointer">Save Summary</button>
            </div>
          </div>
        </div>
      )}

      {/* Skill Modal */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm relative">
            <button onClick={() => setIsSkillModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <FiX className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Add Skill</h3>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="e.g. React.js, Python"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddSkill(); }}
            />
            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => setIsSkillModalOpen(false)} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition cursor-pointer">Cancel</button>
              <button onClick={handleAddSkill} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow transition cursor-pointer">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {isExpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsExpModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <FiX className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Add Experience</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={expData.company} onChange={e => setExpData({ ...expData, company: e.target.value })} placeholder="Company Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={expData.role} onChange={e => setExpData({ ...expData, role: e.target.value })} placeholder="Software Engineer" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={expData.startDate} onChange={e => setExpData({ ...expData, startDate: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={expData.endDate} onChange={e => setExpData({ ...expData, endDate: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
                  value={expData.description} onChange={e => setExpData({ ...expData, description: e.target.value })} placeholder="Describe your responsibilities..." />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => setIsExpModalOpen(false)} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition cursor-pointer">Cancel</button>
              <button onClick={handleAddExperience} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow transition cursor-pointer">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Education Modal */}
      {isEduModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative">
            <button onClick={() => setIsEduModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <FiX className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Add Education</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution *</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={eduData.institution} onChange={e => setEduData({ ...eduData, institution: e.target.value })} placeholder="University Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={eduData.degree} onChange={e => setEduData({ ...eduData, degree: e.target.value })} placeholder="B.S. Computer Science" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
                  <input type="number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={eduData.startYear} onChange={e => setEduData({ ...eduData, startYear: e.target.value })} placeholder="2018" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
                  <input type="number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={eduData.endYear} onChange={e => setEduData({ ...eduData, endYear: e.target.value })} placeholder="2022" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => setIsEduModalOpen(false)} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition cursor-pointer">Cancel</button>
              <button onClick={handleAddEducation} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow transition cursor-pointer">Save</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Accounts;
