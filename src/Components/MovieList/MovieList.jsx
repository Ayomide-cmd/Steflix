import React, { useEffect, useState } from "react";
import "./MovieList.css";
import MovieCard from "../MovieCard/MovieCard";

const categoryEmojis = {
  popular: "Popular 🔥",
  top_rated: "Top Rated 🌟",
  upcoming: "Upcoming 🚀",
};

const MovieList = ({ category, isFirst, searchQuery = "" }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const fetchMovies = async () => {
      const type = searchQuery ? "popular" : category;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${type}?api_key=2ca955a613d3e0637f43f9340523bbac`
      );
      const data = await response.json();
      let results = data.results || [];
      
      if (searchQuery) {
        results = results.filter(m => 
          m.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setMovies(results);
      setFilteredMovies(results);
    };
    fetchMovies();
  }, [category, searchQuery]);

  useEffect(() => {
    let tempMovies = [...movies];
    if (minRating > 0) {
      tempMovies = tempMovies.filter(m => m.vote_average >= minRating);
    }
    if (sortOrder === "newest") {
      tempMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sortOrder === "oldest") {
      tempMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    }
    setFilteredMovies(tempMovies);
  }, [minRating, sortOrder, movies]);

  const handleWatchNow = (id) => {
    window.open(`https://www.themoviedb.org/movie/${id}`, "_blank");
  };

  return (
    <section className="movie_list_section">
      {isFirst && movies[0] && !searchQuery && (
        <div 
          className="hero_container" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(15,23,42,1)), url(https://image.tmdb.org/t/p/original${movies[0].backdrop_path})` 
          }}
        >
          <div className="hero_content">
            <h1 className="hero_title">{movies[0].title}</h1>
            <p className="hero_desc">{movies[0].overview}</p>
            <button className="watch_btn" onClick={() => handleWatchNow(movies[0].id)}>
              Watch Now
            </button>
          </div>
        </div>
      )}

      <div className="grid_wrapper">
        <div className="list_header">
          <h2 className="list_title">
            {searchQuery 
              ? `🔍 Results: ${searchQuery}` 
              : (categoryEmojis[category] || category.replace('_', ' '))
            }
          </h2>

          <div className="filter_toolbar">
            <div className="rating_filters">
              {[6, 7, 8].map(num => (
                <button 
                  key={num} 
                  className={`filter_btn ${minRating === num ? 'active' : ''}`}
                  onClick={() => setMinRating(minRating === num ? 0 : num)}
                >
                  {num}+
                </button>
              ))}
            </div>

            <div className="sort_container">
              <select 
                className="sort_select" 
                onChange={(e) => setSortOrder(e.target.value)}
                value={sortOrder}
              >
                <option value="default">Sort</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
              <span className="custom_arrow"></span>
            </div>
          </div>
        </div>

        <div className="movie_grid">
          {filteredMovies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieList;