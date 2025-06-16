import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        if (!movieResponse.ok || !videosResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const movieData = await movieResponse.json();
        const videosData = await videosResponse.json();

        setMovie(movieData);
        setVideos(videosData.results);
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
  // ) || videos.find((video) => video.site === "YouTube");

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="md:w-2/3 text-white">
        <h1 className="text-3xl text-black font-bold">{movie.title}</h1>
        <p className="text-gray-700 mt-2">
          {movie.release_date
            ? new Date(movie.release_date).toLocaleDateString()
            : "Release date not available"}
        </p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400 mr-2">⭐</span>
          <span className="text-gray-900">
            {movie.vote_average?.toFixed(1)}/10
          </span>
          <span className="ml-4 text-gray-900">({movie.vote_count} votes)</span>
        </div>

        {trailer && (
          <div className="mt-6  text-gray-900">
            <h2 className="text-xl font-semibold mb-2">Trailer</h2>
            <div className="aspect-video overflow-hidden rounded-lg w-full">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className=" w-full h-full"
              />
            </div>
          </div>
        )}

        {movie.genres?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-gray-700 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        <h2 className="text-xl  mt-6 mb-2 text-gray-900 font-semibold">
          Overview
        </h2>
        <p className="text-gray-900 font-semibold">
          {movie.overview || "No overview available."}
        </p>

        {movie.runtime && (
          <p className="mt-4 text-gray-900 font-semibold">
            Runtime: {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
