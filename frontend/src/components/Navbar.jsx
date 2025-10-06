import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Quiz App</h2>
      </div>

      <div className={`navbar-right ${isOpen ? "open" : ""}`}>
        <Link to="/create-quiz">
          <button className="create-quiz-btn">Create New Quiz</button>
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        &#9776; {/* Hamburger icon */}
      </div>
    </nav>
  );
}

export default Navbar;
