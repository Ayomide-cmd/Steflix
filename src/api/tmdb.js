console.log("TMDB API KEY:", import.meta.env.VITE_TMDB_API_KEY);


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMoviesByCategory(category) {
  const res = await fetch(
    `${BASE_URL}/movie/${category}?api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(
      query
    )}&api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to search movies");
  return res.json();
}