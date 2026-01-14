import React, { useEffect, useState } from "react";
import "./DarkMode.css";

const DarkMode = ({ id = "nav" }) => {
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

  const toggleId = `darkmode-toggle-${id}`;

  return (
    <div className="dark_mode_toggle">
      <input
        type="checkbox"
        className="dark_mode_checkbox"
        id={toggleId}
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label className="dark_mode_label" htmlFor={toggleId}>
        <span className="sun_icon"></span>
        <span className="moon_icon"></span>
        <div className="toggle_ball"></div>
      </label>
    </div>
  );
};

export default DarkMode;