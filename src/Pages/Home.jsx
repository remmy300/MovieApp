import React from "react";
import hero_image from "../assets/hero-image.png";
import Search from "../Components/Search";
import MovieList from "../Components/MovieList";
import FilterBar from "../Components/FilterBar";

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
}) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full h-64 bg-gray-300 overflow-hidden">
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

      <div className="container mx-auto px-4 py-6">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="container mx-auto px-4 py-4">
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
      </div>

      <div className="container mx-auto px-4 py-8">
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
