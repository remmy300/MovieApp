import React, { useState } from "react";
import hero_image from "../src/assets/hero-image.png";
import Search from "./Components/Search";
import MovieList from "./Components/MovieList";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-gray-200 h-screen ">
      <div>
        <img src={hero_image} alt="hero" className="object-cover " />
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <MovieList searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default App;
