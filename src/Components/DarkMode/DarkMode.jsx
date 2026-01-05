import React, { useEffect, useState } from "react";
import "./DarkMode.css";

const DarkMode = () => {
  const [theme, setTheme] = useState(() => {
    
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
   
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="dark_mode_toggle">
      <input
        type="checkbox"
        className="dark_mode_checkbox"
        id="darkmode-toggle"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <span className="sun_icon">☀️</span>
        <span className="moon_icon">🌙</span>
        <div className="toggle_ball"></div>
      </label>
    </div>
  );
};

export default DarkMode;