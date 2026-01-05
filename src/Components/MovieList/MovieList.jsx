import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import "./MovieList.css";
import MovieCard from "../MovieCard/MovieCard";
import { fetchMoviesByCategory, searchMovies } from "../../api/tmdb";

const categoryEmojis = {
  popular: "Popular 🔥",
  top_rated: "Top Rated 🌟",
  upcoming: "Upcoming 🚀",
};

const MovieList = ({ category, isFirst, searchQuery = "" }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies", category, searchQuery],
    queryFn: () => searchQuery ? searchMovies(searchQuery) : fetchMoviesByCategory(category),
    staleTime: 1000 * 60 * 5,
  });

  const movies = data?.results || [];

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handleWatchNow = (id) => {
    window.open(`https://www.themoviedb.org/movie/${id}`, "_blank");
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      setTimeout(() => {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }, 300);
    }
  };

  if (isLoading) return <div className="loading_row_shimmer" />;
  if (isError) return <div className="status_text error">Error: {error.message}</div>;

  return (
    <section className={`movie_section ${isFirst ? "first_section" : ""}`}>
      
      {isFirst && movies[0] && !searchQuery && (
        <div
          className="hero_banner"
          style={{
            backgroundImage: `linear-gradient(to right, #0f172a 10%, transparent 70%), 
                              linear-gradient(to top, #0f172a 5%, transparent 30%),
                              url(https://image.tmdb.org/t/p/original${movies[0].backdrop_path})`,
          }}
        >
          <div className="hero_content_main">
            <h1 className="hero_title_main">{movies[0].title}</h1>
            <p className="hero_overview_main">{movies[0].overview}</p>
            <div className="hero_actions">
              <button className="btn_play" onClick={() => handleWatchNow(movies[0].id)}>
                <span>▶</span> Play
              </button>
              <button className="btn_info" onClick={() => handleWatchNow(movies[0].id)}>
                <span>ⓘ</span> More Info
              </button>
            </div>
          </div>
        </div>
      )}

     
      <div className={`row_wrapper ${isFirst && !searchQuery ? "row_overlap" : ""}`}>
        <h2 className="row_title">
          {searchQuery ? `Results: ${searchQuery}` : categoryEmojis[category]}
        </h2>
        
        <div className="carousel_container">
          {showLeftArrow && (
            <button 
              onClick={() => scroll('left')}
              className="scroll_arrow left"
              aria-label="Scroll left"
            >
              ‹
            </button>
          )}
          
          {showRightArrow && (
            <button 
              onClick={() => scroll('right')}
              className="scroll_arrow right"
              aria-label="Scroll right"
            >
              ›
            </button>
          )}
          
          <div className="movie_carousel" ref={scrollContainerRef}>
            {filteredMovies.map((movie) => (
              <div className="carousel_item" key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieList;