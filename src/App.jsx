import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MovieDetailsPage from "./Pages/MovieDetailsPage";

const App = () => {
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

  useEffect(() => {
    localStorage.setItem("selectedGenre", selectedGenre);
    localStorage.setItem("selectedCountry", selectedCountry);
    localStorage.setItem("selectedType", selectedType);
    localStorage.setItem("sortOrder", sortOrder);
  }, [selectedGenre, selectedCountry, selectedType, sortOrder]);

  return (
    <div className="bg-gray-200 min-h-screen">
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
            />
          }
        />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
