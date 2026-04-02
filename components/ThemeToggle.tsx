"use client";

import { useTheme } from "@/context/themeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition"
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
          theme === "dark" ? "translate-x-6" : ""
        }`}
      />
    </button>
  );
}