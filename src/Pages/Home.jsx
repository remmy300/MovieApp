import React from "react";
import hero_image from "../assets/hero-image.png";
import Search from "../Components/Search";
import MovieList from "../Components/MovieList";
import FilterBar from "../Components/FilterBar";
import ThemeToggle from "../Components/ThemeToggle";

const Home = ({
  searchTerm,
  selectedCountry,
  selectedGenre,
  selectedType,
  setSelectedCountry,
  setSelectedGenre,
  setSelectedType,
  setSortOrder,
  sortOrder,
  setSearchTerm,
  isDark,
  setIsDark,
}) => {
  return (
    <div className="min-h-screen ">
      <div className="h-64 w-full">
        <img
          src={hero_image}
          alt="hero"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = "none";
          }}
        />
      </div>
      <nav className=" container mx-auto px-4  ">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <FilterBar
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
        </div>
      </nav>

      <div className="container mx-auto px-4 py-3">
        <MovieList
          searchTerm={searchTerm}
          selectedGenre={selectedGenre}
          selectedCountry={selectedCountry}
          selectedType={selectedType}
          sortOrder={sortOrder}
        />
      </div>
    </div>
  );
};

export default Home;
