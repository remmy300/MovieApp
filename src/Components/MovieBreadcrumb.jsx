import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MovieBreadcrumb = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        color: "black",
        px: 4,
        py: 4,

        ".dark &": { color: "white" },
      }}
      separator="/"
    >
      <Link
        underline="hover"
        onClick={() => navigate("/")}
        className="cursor-pointer text-black dark:text-white"
      >
        Home
      </Link>

      <Link
        underline="hover"
        onClick={() => navigate("/movies")}
        className="cursor-pointer text-black dark:text-white"
      >
        Movies
      </Link>

      <Typography className="text-black dark:text-white">
        {movie.title}
      </Typography>
    </Breadcrumbs>
  );
};

export default MovieBreadcrumb;
