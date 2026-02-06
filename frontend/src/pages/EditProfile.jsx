import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { updateProfile } from "../services/api.js";

const EditProfile = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    about: "",
    skills: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender || "",
      about: user.about || "",
      skills: user.skills?.join(", ") || "",
    });
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);
    try {
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        about: formData.about,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });
      await refreshUser();
      setSuccess("Profile updated successfully");
      setTimeout(() => navigate("/profile"), 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <h1 className="page-title">Edit profile</h1>
      <form className="glass-panel form-grid" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-control">
            <label htmlFor="firstName">First name</label>
            <input id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} />
          </div>
          <div className="form-control">
            <label htmlFor="lastName">Last name</label>
            <input id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} />
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Prefer not to say</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="skills">Skills (comma separated)</label>
          <input id="skills" name="skills" value={formData.skills} onChange={handleChange} />
        </div>
        <div className="form-control">
          <label htmlFor="about">About</label>
          <textarea id="about" name="about" value={formData.about} onChange={handleChange} />
        </div>
        {error && <p style={{ color: "#ff8a8a", margin: 0 }}>{error}</p>}
        {success && <p style={{ color: "#6ef3af", margin: 0 }}>{success}</p>}
        <div style={{ display: "flex", gap: 12 }}>
          <button className="primary-btn" type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save changes"}
          </button>
          <button className="secondary-btn" type="button" onClick={() => navigate(-1)} disabled={submitting}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditProfile;
