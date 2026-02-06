import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../services/api.js";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ newPass: "", confNewPass: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.newPass !== formData.confNewPass) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      await updatePassword(formData);
      setSuccess("Password updated successfully");
      setTimeout(() => navigate("/profile"), 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <h1 className="page-title">Change password</h1>
      <form className="glass-panel form-grid" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="newPass">New password</label>
          <input
            id="newPass"
            name="newPass"
            type="password"
            required
            value={formData.newPass}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="confNewPass">Confirm password</label>
          <input
            id="confNewPass"
            name="confNewPass"
            type="password"
            required
            value={formData.confNewPass}
            onChange={handleChange}
          />
        </div>
        {error && <p style={{ color: "#ff8a8a", margin: 0 }}>{error}</p>}
        {success && <p style={{ color: "#6ef3af", margin: 0 }}>{success}</p>}
        <div style={{ display: "flex", gap: 12 }}>
          <button className="primary-btn" type="submit" disabled={submitting}>
            {submitting ? "Updating..." : "Update password"}
          </button>
          <button className="secondary-btn" type="button" onClick={() => navigate(-1)} disabled={submitting}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default PasswordReset;
