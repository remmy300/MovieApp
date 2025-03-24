import React from "react";
import hero_image from "../src/assets/hero-image.png";
import Search from "./Components/Search";

const App = () => {
  return (
    <div className="bg-gray-200 h-screen ">
      <div>
        <img src={hero_image} alt="hero" className="object-cover " />
        <Search />
      </div>
    </div>
  );
};

export default App;
