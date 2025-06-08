import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import MovieCard from "./MovieCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";

const MovieList = ({ searchTerm }) => {
  console.log("search term:" + searchTerm);
  const [playingMovieId, setPlayingMovieId] = useState(null);
  const [trailers, setTrailers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchMovies = async ({ pageParam = 1 }) => {
    const baseUrl = `https://api.themoviedb.org/3`;
    const endpoint = searchTerm
      ? `/search/movie?query=${encodeURIComponent(searchTerm)}`
      : `/movie/popular`;

    const url = `${baseUrl}${endpoint}&api_key=${API_KEY}&language=en-US&page=${pageParam}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  };
  // Inifinite Query

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error: fetchError,
  } = useInfiniteQuery({
    queryKey: ["movies", searchTerm],
    queryFn: fetchMovies,

    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
  });

  // Trailer fetching

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

  const movies = data?.pages.flatMap((page) => page.results) || [];

  console.log(movies);

  if (status === "pending") {
    return (
      <div className="flex items-center justify-center">
        <ClipLoader size={30} />
      </div>
    );
  }

  if (status === "error") {
    return <div>Error:{fetchError.message}</div>;
  }

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
          <MovieCard
            key={movie.id}
            movie={movie}
            isPlaying={playingMovieId === movie.id}
            isTrailerURL={trailers[movie.id]}
            onTrailerClick={fetchTrailer}
            onTrailerClose={() => setPlayingMovieId(null)}
          />
        ))}
      </div>

      <div className="flex justify-center items-center">
        {isFetchingNextPage && (
          <div>
            <ClipLoader size={30} color="black" />
          </div>
        )}
      </div>
    </>
  );
};

export default MovieList;
