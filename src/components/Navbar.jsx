import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        🩺 MediBook
      </Link>
      <nav className="navbar-links">
        <Link to="/">Find a Doctor</Link>
        <Link to="/appointments">My Appointments</Link>
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
