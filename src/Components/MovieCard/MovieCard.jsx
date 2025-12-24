import React from "react";
import "./MovieCard.css";
import star from "../../assets/star.png";

const MovieCard = ({ movie }) => {
  
  const handleClick = () => {
    
    window.open(`https://www.themoviedb.org/movie/${movie.id}`, "_blank");
    
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie_card" onClick={handleClick}>
      <div className="card_rating_badge">
        <img src={star} alt="star" />
        <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
      </div>

      <img src={posterUrl} alt={movie.title} className="movie_poster" />

      <div className="movie_info_overlay">
        <h3 className="movie_title">{movie.title}</h3>
        <p className="movie_description">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;