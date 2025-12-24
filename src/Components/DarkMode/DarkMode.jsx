import React, { useEffect, useState } from "react";
import "./DarkMode.css";

const DarkMode = ({ id = "theme-toggle" }) => {
    
    const [isDark, setIsDark] = useState(
        document.querySelector("body").getAttribute("data-theme") === "dark"
    );

    const toggleTheme = (e) => {
        const theme = e.target.checked ? "dark" : "light";
        document.querySelector("body").setAttribute("data-theme", theme);
        localStorage.setItem("selectedTheme", theme);
        setIsDark(e.target.checked);
    };

    useEffect(() => {
      
        const savedTheme = localStorage.getItem("selectedTheme");
        
        if (!savedTheme || savedTheme === "dark") {
            document.querySelector("body").setAttribute("data-theme", "dark");
            setIsDark(true);
        } else {
            document.querySelector("body").setAttribute("data-theme", "light");
            setIsDark(false);
        }

        // 3. Keep your MutationObserver for synchronization
        const observer = new MutationObserver(() => {
            const currentTheme = document.querySelector("body").getAttribute("data-theme");
            setIsDark(currentTheme === "dark");
        });

        observer.observe(document.querySelector("body"), { attributes: true });
        return () => observer.disconnect();
    }, []);

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id={id}
                onChange={toggleTheme}
                checked={isDark} 
            />
            <label className='dark_mode_label' htmlFor={id}>
                <div className="knob">
                    <span className={`icon sun ${isDark ? "hidden" : ""}`}>☀️</span>
                    <span className={`icon moon ${isDark ? "" : "hidden"}`}>🌙</span>
                </div>
            </label>
        </div>
    );
};

export default DarkMode;