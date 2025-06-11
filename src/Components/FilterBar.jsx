import React from "react";
import useGenres from "../Hooks/useGenres";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from "@mui/material";

const FilterBar = ({
  selectedGenre,
  setSelectedGenre,
  selectedCountry,
  setSelectedCountry,
  selectedType,
  setSelectedType,
  sortOrder,
  setSortOrder,
}) => {
  const { data: genres = [], isLoading } = useGenres(selectedType || "movie");

  return (
    <Box display={"flex"} flexWrap={"wrap"} p={2} gap={3}>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        disabled={isLoading}
      >
        <InputLabel id="genre-label">Genre</InputLabel>
        <Select
          labelId="genre-label"
          value={selectedGenre}
          label="Genre"
          onChange={(event) => setSelectedGenre(event.target.value)}
        >
          <MenuItem value="">
            <em>All Genres</em>
          </MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="country-label">Country</InputLabel>
        <Select
          labelId="country-label"
          value={selectedCountry}
          label="Country"
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <MenuItem value="">
            <em>All Countries</em>
          </MenuItem>
          <MenuItem value="US">US</MenuItem>
          <MenuItem value="IN">India</MenuItem>
          <MenuItem value="KR">Korea</MenuItem>
          <MenuItem value="JP">Japan</MenuItem>
          <MenuItem value="KE">Kenya</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          value={selectedType}
          label="Type"
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <MenuItem value="">
            <em>All Movies/TvSeries</em>
          </MenuItem>
          <MenuItem value="movie">Movies</MenuItem>
          <MenuItem value="tv">Series</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="sort-label">Sort</InputLabel>
        <Select
          labelId="sort-label"
          value={sortOrder}
          label="Sort"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="popularity.desc">Most Popular</MenuItem>
          <MenuItem value="vote_average.desc">Top Rated</MenuItem>
          <MenuItem value="release_date.desc">Newest</MenuItem>
          <MenuItem value="release_date.asc">Oldest</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        size="small"
        sx={{ alignSelf: "center", m: 1 }}
        onClick={() => {
          setSelectedGenre("");
          setSelectedCountry("");
          setSelectedType("");
          setSortOrder("");
        }}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default FilterBar;
