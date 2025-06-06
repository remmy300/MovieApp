import React, { useState } from "react";
import { XCircle } from "lucide-react";
import { ClipLoader } from "react-spinners";

const MovieList = ({ movies }) => {
  const [playingMovieId, setPlayingMovieId] = useState(null);
  const [trailers, setTrailers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchTrailer = React.useCallback(
    async (movieId) => {
      if (trailers[movieId]) {
        setPlayingMovieId(movieId);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        console.log("Fetched data:", data);

        const trailer = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        if (trailer) {
          setTrailers((prev) => ({
            ...prev,
            [movieId]: `https://www.youtube.com/embed/${trailer.key}?autoplay=1`,
          }));
          setPlayingMovieId(movieId);
        } else {
          setLoading("Trailer not available.");
        }
      } catch (error) {
        setError(`Error fetching trailer:${error.message}`);
      } finally {
        setLoading(false);
      }
    },
    [trailers, API_KEY]
  );

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center">
          {<ClipLoader size={50} color="black" />}
        </div>
      )}

      {error && <div className="text-2xl font-semibold">{error}</div>}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative bg-gray-900 rounded-2xl p-4 shadow-md transition-all duration-300 hover:shadow-blue-400/30 group"
          >
            {playingMovieId === movie.id && trailers[movie.id] ? (
              <div className="relative animate-fade-in">
                <iframe
                  className="rounded-xl w-full aspect-video shadow-lg border border-gray-300 shadow-blue-500/30"
                  src={trailers[movie.id]}
                  title={movie.title}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>

                <button
                  onClick={() => setPlayingMovieId(null)}
                  className="absolute top-2 right-2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-1.5 rounded-full transition-all"
                >
                  <XCircle size={24} />
                </button>
              </div>
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-xl w-full cursor-pointer transition-all duration-200 group-hover:scale-105"
                onClick={() => fetchTrailer(movie.id)}
              />
            )}
            <div className="mt-3">
              <h3 className="text-white text-lg font-semibold line-clamp-2">
                {movie.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieList;
