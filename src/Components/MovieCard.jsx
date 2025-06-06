import React from "react";
import { XCircle } from "lucide-react";

const MovieCard = ({
  movie,
  isPlaying,
  isTrailerURL,
  onTrailerClick,
  onTrailerClose,
}) => {
  return (
    <>
      <div className="relative bg-gray-900 rounded-2xl p-4 shadow-md transition-all duration-300 hover:shadow-blue-400/30 group">
        {isPlaying && isTrailerURL ? (
          <div className="relative animate-fade-in">
            <iframe
              className="rounded-xl w-full aspect-video shadow-lg border border-gray-300 shadow-blue-500/30"
              src={isTrailerURL}
              title={movie.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

            <button
              onClick={() => onTrailerClose()}
              className="absolute top-2 right-2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-1.5 rounded-full transition-all"
              aria-label="close trailer"
            >
              <XCircle size={24} />
            </button>
          </div>
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
            className="rounded-xl w-full cursor-pointer transition-all duration-200 group-hover:scale-105"
            onClick={() => onTrailerClick(movie.id)}
          />
        )}
        <div className="mt-3">
          <h3 className="text-white text-lg font-semibold line-clamp-2">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{movie.release_date}</p>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
