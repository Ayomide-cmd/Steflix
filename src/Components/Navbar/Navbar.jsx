import React, { useState, useEffect } from "react";
import "./Navbar.css";
import DarkMode from "../DarkMode/DarkMode";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";
  };

  return (
    <header className={`navbar_wrapper ${scrolled ? "navbar_scrolled" : ""}`}>
      <div className="navbar_container">
        {/* Sleek Logo */}
        <div className="navbar_logo">STEFLIX</div>

        {/* --- DESKTOP NAV --- */}
        <div className="desktop_content">
          <nav className="nav_links">
            <a href="#popular" className="nav_link">Popular</a>
            <a href="#top_rated" className="nav_link">Top Rated</a>
            <a href="#upcoming" className="nav_link">Upcoming</a>
          </nav>
          <div className="nav_search_box">
            <input type="text" placeholder="Search movies..." className="search_input" />
          </div>
          <DarkMode />
        </div>

        
        <div className="mobile_hamburg" onClick={toggleMenu}>
          <div className={`burger_line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`burger_line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`burger_line ${isMenuOpen ? "open" : ""}`}></div>
        </div>
      </div>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      <aside className={`mobile_drawer ${isMenuOpen ? "drawer_active" : ""}`}>
        <div className="drawer_links">
          <a href="#popular" onClick={toggleMenu}>Popular 🔥</a>
          <a href="#top_rated" onClick={toggleMenu}>Top Rated 🌟</a>
          <a href="#upcoming" onClick={toggleMenu}>Upcoming 🚀</a>
        </div>
        
        <div className="drawer_search">
          <input type="text" placeholder="Search..." className="search_input" />
        </div>

        <div className="drawer_footer">
          <div className="theme_row">
            <span>Appearance</span>
            <DarkMode />
          </div>
        </div>
      </aside>

      {/* Background Overlay */}
      {isMenuOpen && <div className="menu_overlay" onClick={toggleMenu}></div>}
    </header>
  );
};

export default Navbar;