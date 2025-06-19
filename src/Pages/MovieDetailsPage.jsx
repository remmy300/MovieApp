import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieBreadcrumb from "../Components/MovieBreadcrumb";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );

        const videosResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );

        const similarMoviesResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`
        );

        if (
          !movieResponse.ok ||
          !videosResponse.ok ||
          !similarMoviesResponse.ok
        ) {
          throw new Error("Failed to fetch data");
        }

        const movieData = await movieResponse.json();
        const videosData = await videosResponse.json();
        const similarData = await similarMoviesResponse.json();

        setMovie(movieData);
        setVideos(videosData.results);
        setSimilarMovies(similarData.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, API_KEY]);

  if (loading)
    return <div className="text-white text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  if (!movie)
    return <div className="text-white text-center py-8">No movie found</div>;

  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <div className="w-full min-h-screen mx-auto p-4">
      <div className="w-full text-white">
        <h1 className="text-3xl text-black dark:text-white font-bold">
          {movie.title}
        </h1>
        <p className="text-gray-700 dark:text-gray-200 mt-2">
          {movie.release_date
            ? new Date(movie.release_date).toLocaleDateString()
            : "Release date not available"}
        </p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400 mr-2">⭐</span>
          <span className="text-gray-900 dark:text-gray-200">
            {movie.vote_average?.toFixed(1)}/10
          </span>
          <span className="ml-4 text-gray-900 dark:text-gray-200">
            ({movie.vote_count} votes)
          </span>
        </div>

        <MovieBreadcrumb movie={movie} />

        {trailer && (
          <>
            <div className="mt-2 text-gray-900 dark:text-gray-200">
              <h2 className="text-xl font-semibold mb-2">Trailer</h2>

              <div
                className="aspect-video overflow-hidden rounded-lg w-full relative cursor-pointer group  "
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  src={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`}
                  alt={`${movie.title} Trailer Thumbnail`}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-0" />

                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="bg-white p-4 rounded-full shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-red-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <Modal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              aria-labelledby="trailer-modal"
              aria-describedby="modal-youtube-player"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  borderRadius: 2,
                  outline: "none",
                  width: { xs: "90%", md: "70%" },
                }}
              >
                <IconButton
                  onClick={() => setIsModalOpen(false)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 10,
                    color: "white",
                  }}
                >
                  <CloseIcon />
                </IconButton>

                <div className="aspect-video w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                    title={`${movie.title} Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  />
                </div>
              </Box>
            </Modal>
          </>
        )}

        {movie.genres?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        <h2 className="text-xl mt-6 mb-2 text-gray-900 dark:text-gray-200 font-semibold">
          Overview
        </h2>
        <p className="text-gray-900 dark:text-gray-300 font-semibold">
          {movie.overview || "No overview available."}
        </p>

        {movie.runtime && (
          <p className="mt-4 text-gray-900 dark:text-gray-300 font-semibold">
            Runtime: {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
          </p>
        )}
        {similarMovies && similarMovies.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-300">
              Similar Movies
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-4">
              {similarMovies.slice(0, 10).map((similarMovie) => (
                <Link
                  to={`/movie/${similarMovie.id}`}
                  key={similarMovie.id}
                  className="flex-shrink-0"
                >
                  <div className="min-w-[150px] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                    <img
                      src={
                        similarMovie.poster_path
                          ? `https://image.tmdb.org/t/p/w185${similarMovie.poster_path}`
                          : "https://via.placeholder.com/150x225?text=No+Image"
                      }
                      alt={similarMovie.title}
                      className="w-full h-[225px] object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/150x225?text=No+Image";
                      }}
                    />
                    <div className="p-2">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-300 text-center truncate">
                        {similarMovie.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
