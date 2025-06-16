import React from "react";
import { XCircle, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-gray-900 rounded-2xl p-4 shadow-md transition-all duration-300 hover:shadow-blue-400/30 group cursor-pointer"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
          className="rounded-xl w-full transition-all duration-200 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-xl">
          <div className="bg-blue-600 p-3 rounded-full">
            <Play size={24} className="text-white" />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-white text-lg font-semibold line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          {new Date(movie.release_date).toLocaleDateString()}
        </p>
        <div className="flex items-center mt-1">
          <span className="text-yellow-400 text-sm mr-1">⭐</span>
          <span className="text-white text-sm">
            {movie.vote_average?.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
