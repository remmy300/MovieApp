import React, { useEffect, useMemo, useState, useRef } from "react";
import { ClipLoader } from "react-spinners";
import MovieCard from "./MovieCard";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";

const MovieList = ({
  searchTerm,
  selectedCountry,
  selectedType,
  selectedGenre,
  sortOrder,
}) => {
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [playingMovieId, setPlayingMovieId] = useState(null);
  const [trailers, setTrailers] = useState({});
  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

  const fetchMovies = async ({ pageParam = 1 }) => {
    const type = selectedType === "all" ? "" : selectedType || "movie";
    let endpoint = debouncedSearch
      ? `/search/${type || "movie"}`
      : `/discover/${type || "movie"}`;

    const params = new URLSearchParams({
      api_key: API_KEY,
      language: "en-US",
      page: pageParam,
      ...(debouncedSearch && { query: debouncedSearch }),
      ...(selectedGenre && { with_genres: selectedGenre }),
      ...(selectedCountry && {
        with_origin_country: selectedCountry,
        region: selectedCountry,
      }),
      ...(sortOrder && { sort_by: sortOrder }),
    });

    const url = `https://api.themoviedb.org/3${endpoint}?${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch movies");
    }

    return response.json();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error: fetchError,
    refetch,
  } = useInfiniteQuery({
    queryKey: [
      "movies",
      debouncedSearch,
      selectedGenre,
      selectedCountry,
      selectedType,
      sortOrder,
    ],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
  });

  const observerRef = useRef();

  useEffect(() => {
    const current = observerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  const fetchTrailer = async (movieId, retry = 3) => {
    try {
      if (trailers[movieId]) {
        setPlayingMovieId(movieId);
        return;
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
      );
      const data = await response.json();

      const trailer =
        data.results?.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        ) || data.results?.[0];

      if (trailer) {
        setTrailers((prev) => ({
          ...prev,
          [movieId]: {
            url: `https://www.youtube.com/embed/${trailer.key}`,
            title: trailer.name || "Movie Trailer",
          },
        }));
        setPlayingMovieId(movieId);
      } else if (retry > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await fetchTrailer(movieId, retry - 1);
      }
    } catch (error) {
      console.error("Trailer fetch error:", error);
    }
  };

  const movies = useMemo(
    () => data?.pages.flatMap((page) => page.results) || [],
    [data]
  );

  if (status === "pending") {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader size={50} color="#3B82F6" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{fetchError.message}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {movies.length === 0 && !isFetchingNextPage && (
        <div className="text-center py-20 text-gray-500 dark:text-gray-200">
          No movies found. Try different filters.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={`${movie.id}-${movie.popularity}`}
            movie={movie}
            isPlaying={playingMovieId === movie.id}
            trailer={trailers[movie.id]}
            onTrailerClick={() => fetchTrailer(movie.id)}
            onTrailerClose={() => setPlayingMovieId(null)}
            onClick={() => navigate(`/movie/${movie.id}`)}
          />
        ))}
      </div>
      <div ref={observerRef} className="py-10">
        {isFetchingNextPage && <ClipLoader />}
        {!hasNextPage && movies.length > 0 && (
          <p className="text-center text-gray-500 dark:text-gray-200">
            No more movies to load
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
