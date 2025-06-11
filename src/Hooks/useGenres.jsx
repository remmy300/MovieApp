import React from "react";
import { useQuery } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_API_KEY;

const useGenres = (type = "movie") => {
  return useQuery({
    queryKey: ["genres", type],
    queryFn: async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`
      );

      if (!res.ok) throw new Error("Failed to fetch genres");
      const data = await res.json();
      return data.genres;
    },
    staleTime: 60 * 60 * 1000,
  });
};

export default useGenres;
