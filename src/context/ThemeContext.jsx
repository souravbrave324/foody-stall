import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const getTimeBasedTheme = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) {
    return "morning";
  } else if (hour >= 12 && hour < 18) {
    return "afternoon";
  } else {
    return "night";
  }
};

export const ThemeProvider = ({ children }) => {
  // themeMode: "auto" | "morning" | "afternoon" | "night"
  const [themeMode, setThemeModeState] = useState(() => {
    const saved = localStorage.getItem("foody_theme_mode");
    return saved || "auto";
  });

  const [effectiveTheme, setEffectiveTheme] = useState(() => {
    if (themeMode === "auto") {
      return getTimeBasedTheme();
    }
    return themeMode;
  });

  // Calculate and apply effective theme
  useEffect(() => {
    const updateTheme = () => {
      let currentTheme = themeMode;
      if (themeMode === "auto") {
        currentTheme = getTimeBasedTheme();
      }
      setEffectiveTheme(currentTheme);

      // Remove existing theme classes
      document.documentElement.classList.remove("theme-morning", "theme-afternoon", "theme-night", "light", "dark");

      // Add active theme class
      document.documentElement.classList.add(`theme-${currentTheme}`);
      if (currentTheme === "morning") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.add("dark");
      }
    };

    updateTheme();

    // In auto mode, check every minute for time-based transition
    const interval = setInterval(() => {
      if (themeMode === "auto") {
        updateTheme();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [themeMode]);

  const setThemeMode = (mode) => {
    setThemeModeState(mode);
    localStorage.setItem("foody_theme_mode", mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
