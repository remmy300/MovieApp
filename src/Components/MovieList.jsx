import React, { useEffect, useMemo, useState } from "react";
import { ClipLoader } from "react-spinners";
import MovieCard from "./MovieCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";

const MovieList = ({
  searchTerm,
  selectedCountry,
  selectedType,
  selectedGenre,
  sortOrder,
}) => {
  console.log("Current filters:", {
    searchTerm,
    selectedGenre,
    selectedCountry,
    selectedType,
    sortOrder,
  });

  const [playingMovieId, setPlayingMovieId] = useState(null);
  const [trailers, setTrailers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  const observerRef = useRef();

  const fetchMovies = async ({ pageParam = 1 }) => {
    const baseUrl = `https://api.themoviedb.org/3`;
    const type = selectedType || "movie";
    let endpoint = "";

    const params = new URLSearchParams({
      api_key: API_KEY,
      language: "en-US",
      page: pageParam,
    });

    if (selectedGenre) params.append("with_genres", selectedGenre);
    if (selectedCountry) {
      params.append("with_origin_country", selectedCountry);
      params.append("region", selectedCountry);
    }
    if (sortOrder) params.append("sort_by", sortOrder);

    if (searchTerm) {
      endpoint = `/search/${type}`;
      params.append("query", searchTerm);
    } else {
      endpoint = `/discover/${type}`;
    }

    const url = `${baseUrl}${endpoint}?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error: fetchError,
  } = useInfiniteQuery({
    queryKey: [
      "movies",
      searchTerm,
      selectedGenre,
      selectedCountry,
      selectedType,
      sortOrder,
    ],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    staleTime: 5 * 60 * 100,
    keepPreviousData: false,
    enabled: true,
  });

  useEffect(() => {
    const currentRef = observerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5, rootMargin: "100px" }
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

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

  const movies = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);

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

      <div ref={observerRef} className="flex justify-center items-center h-20">
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
