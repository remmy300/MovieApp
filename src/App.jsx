import React, { useEffect, useState } from "react";
import hero_image from "../src/assets/hero-image.png";
import Search from "./Components/Search";
import MovieList from "./Components/MovieList";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  console.log("API KEY: ", API_KEY);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const endpoint = searchTerm
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=en-US&page=1`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log("Fetched data:", data);

        setMovies(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm, API_KEY]);

  return (
    <div className="bg-gray-200 h-screen ">
      <div>
        <img src={hero_image} alt="hero" className="object-cover " />
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {loading ? "Loading..." : <MovieList movies={movies} />}
        <MovieList />
      </div>
    </div>
  );
};

export default App;
