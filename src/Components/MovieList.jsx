import React from "react";

const MovieList = ({ movies }) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-visible">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg min-h-[200px] p-4 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 ease-in-out"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg mb-2"
            />
            <h3 className="text-white md:text-2xl text-lg font-semibold">
              {movie.title}
            </h3>
            <p className="text-gray-400 md:text-2xl lg:text-lg">
              {movie.release_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
