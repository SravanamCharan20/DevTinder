import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, login, user, initializing } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    skills: "",
    about: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        about: formData.about,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      await signup(payload);
      await login({ email: formData.email, password: formData.password });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!initializing && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="main-content">
      <div className="glass-panel auth-card">
        <h1 className="page-title">Create your DevTinder profile</h1>
        <form className="form-grid" onSubmit={handleSubmit}>
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
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-row">
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" required value={formData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="skills">Skills (comma separated)</label>
            <input
              id="skills"
              name="skills"
              placeholder="React, Node, MongoDB"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="about">About</label>
            <textarea
              id="about"
              name="about"
              placeholder="Pitch yourself to other devs"
              value={formData.about}
              onChange={handleChange}
            />
          </div>
          {error && <p style={{ color: "#ff8585", margin: 0 }}>{error}</p>}
          <button className="primary-btn" type="submit" disabled={submitting}>
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>
        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </main>
  );
};

export default Signup;
