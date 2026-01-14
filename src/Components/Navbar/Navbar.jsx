import React, { useState, useEffect } from "react";
import "./Navbar.css";
import DarkMode from "../DarkMode/DarkMode";

const Navbar = ({ setSearchQuery }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <nav className={`navbar_fixed ${scrolled ? "scrolled" : ""}`}>
      <div className="nav_content">
        <div className="nav_left">
          <div className="nav_logo_pink">STEFLIX</div>
          <div className="desktop_links">
            <a href="#popular">Home</a>
            <a href="#top_rated">TV Shows</a>
            <a href="#upcoming">Movies</a>
          </div>
        </div>

        <div className="nav_right">
          <div className="nav_search_wrapper">
            <svg className="search_icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input 
              type="text" 
              placeholder="Search..." 
              className="nav_search" 
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="desktop_darkmode">
            <DarkMode />
          </div>
          
          <button 
            className={`nav_hamburger ${isMenuOpen ? "active" : ""}`} 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </button>
        </div>
      </div>

      <div className={`nav_mobile_drawer ${isMenuOpen ? "show" : ""}`}>
        <div className="drawer_content">
          <div className="drawer_links">
            <a href="#popular" onClick={closeMenu}>Home</a>
            <a href="#top_rated" onClick={closeMenu}>TV Shows</a>
            <a href="#upcoming" onClick={closeMenu}>Movies</a>
          </div>
          
          <div className="drawer_footer">
            <div className="drawer_theme_section">
              <span className="theme_label">Theme</span>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
      
      {isMenuOpen && <div className="nav_overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar;