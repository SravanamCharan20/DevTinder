import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="navbar">
      <div className="logo">DevTinder</div>
      <nav className="nav-links">
        <NavLink to="/" end>
          Feed
        </NavLink>
        <NavLink to="/requests">Requests</NavLink>
        <NavLink to="/connections">Connections</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
      <div className="user-meta">
        <div>
          <div style={{ fontWeight: 600 }}>{user?.firstName}</div>
          <div style={{ fontSize: "0.8rem", color: "#9baeca" }}>Logged in</div>
        </div>
        <button className="secondary-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
