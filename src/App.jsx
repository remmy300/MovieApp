import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./theme";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MovieDetailsPage from "./Pages/MovieDetailsPage";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(
    localStorage.getItem("selectedGenre") || ""
  );
  const [selectedType, setSelectedType] = useState(
    localStorage.getItem("selectedType") || ""
  );
  const [selectedCountry, setSelectedCountry] = useState(
    localStorage.getItem("selectedCountry") || ""
  );
  const [sortOrder, setSortOrder] = useState(
    localStorage.getItem("sortOrder") || ""
  );
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("selectedGenre", selectedGenre);
    localStorage.setItem("selectedCountry", selectedCountry);
    localStorage.setItem("selectedType", selectedType);
    localStorage.setItem("sortOrder", sortOrder);
  }, [selectedGenre, selectedCountry, selectedType, sortOrder]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isDark={isDark}
                setIsDark={setIsDark}
              />
            }
          />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
