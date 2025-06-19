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
  const { data: genres = [] } = useGenres(selectedType || "movie");

  const commonStyles = {
    minWidth: 120,
    m: 1,
    "& .MuiInputBase-root": {
      color: "text.primary",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "divider",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "primary.main",
    },
    "& .MuiSvgIcon-root": {
      color: "text.primary",
    },
  };

  return (
    <Box display="flex" flexWrap="wrap" p={2} gap={3}>
      {/* Genre */}
      <FormControl size="small" sx={commonStyles}>
        <InputLabel id="genre-label">Genre</InputLabel>
        <Select
          labelId="genre-label"
          value={selectedGenre}
          label="Genre"
          onChange={(e) => setSelectedGenre(e.target.value)}
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

      {/* Country */}
      <FormControl size="small" sx={commonStyles}>
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
          {["US", "IN", "KR", "JP", "KE"].map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Type */}
      <FormControl size="small" sx={commonStyles}>
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

      {/* Sort */}
      <FormControl size="small" sx={commonStyles}>
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

      {/* Reset Button */}
      <Button
        variant="outlined"
        size="medium"
        sx={{
          alignSelf: "center",
          m: 1,
          color: "text.primary",
          borderColor: "divider",
          "&:hover": {
            borderColor: "text.secondary",
          },
        }}
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
