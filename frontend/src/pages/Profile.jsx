import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Profile = () => {
  const { user } = useAuth();

  return (
    <section>
      <h1 className="page-title">Your profile</h1>
      <p className="tagline">Keep your details sharp—this is what other devs see.</p>
      <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: 0 }}>
              {user.firstName} {user.lastName}
            </h2>
            <p style={{ margin: 0, color: "#9baeca" }}>{user.email}</p>
            <p style={{ margin: 0, color: "#9baeca" }}>Gender: {user.gender || "Not shared"}</p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link className="secondary-btn" to="/profile/edit">
              Edit Profile
            </Link>
            <Link className="secondary-btn" to="/profile/password">
              Change Password
            </Link>
          </div>
        </div>
        <div>
          <h3>About</h3>
          <p style={{ color: "#d5dbf0", marginTop: 4 }}>{user.about || "No bio yet"}</p>
        </div>
        <div>
          <h3>Skills</h3>
          {user.skills?.length ? (
            <div className="chip-row">
              {user.skills.map((skill) => (
                <span className="chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: "#9baeca" }}>Add skills so people know your strengths.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
