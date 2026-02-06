import Navbar from "./Navbar.jsx";

const AppLayout = ({ children }) => (
  <div className="app-shell">
    <Navbar />
    <main className="main-content">{children}</main>
  </div>
);

export default AppLayout;
