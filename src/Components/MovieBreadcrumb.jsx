// components/MovieBreadcrumb.jsx
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MovieBreadcrumb = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ color: "black", px: 4, py: 4 }}
      separator="/"
    >
      <Link
        underline="hover"
        color="inherit"
        onClick={() => navigate("/")}
        sx={{ cursor: "pointer" }}
      >
        Home
      </Link>
      <Link
        underline="hover"
        color="inherit"
        onClick={() => navigate("/movies")}
        sx={{ cursor: "pointer" }}
      >
        Movies
      </Link>
      <Typography color="text.primary">{movie.title}</Typography>
    </Breadcrumbs>
  );
};

export default MovieBreadcrumb;
