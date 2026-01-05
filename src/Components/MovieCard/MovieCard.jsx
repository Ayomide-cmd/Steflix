import React, { useState } from "react";
import "./MovieCard.css";
import star from "../../assets/star.png";

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!movie) return null;

  const {
    id,
    title,
    overview,
    poster_path,
    vote_average,
  } = movie;

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const handleClick = () => {
    window.open(
      `https://www.themoviedb.org/movie/${id}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  };

  return (
    <div
      className="movie_card"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`View details for ${title || "movie"}`}
    >
      <div className="card_rating_badge">
        <img src={star} alt="Rating star icon" />
        <span>
          {typeof vote_average === "number"
            ? vote_average.toFixed(1)
            : "N/A"}
        </span>
      </div>
      
      <img
        src={posterUrl}
        alt={
          title
            ? `Poster for ${title}`
            : "Movie poster unavailable"
        }
        className="movie_poster"
        loading="lazy"
      />
      
      <div className={`movie_info_overlay ${isHovered ? "show" : ""}`}>
        <h3 className="movie_title">
          {title || "Untitled"}
        </h3>
        <p className="movie_description">
          {overview || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default React.memo(MovieCard);