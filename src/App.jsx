import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import MovieList from "./Components/MovieList/MovieList";
import "./App.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="app">
      <Navbar setSearchQuery={setSearchQuery} />
      
      <main>
        
        {searchQuery ? (
          <MovieList category="popular" searchQuery={searchQuery} />
        ) : (
          <>
            <MovieList category="popular" isFirst={true} />
            <MovieList category="top_rated" />
            <MovieList category="upcoming" />
          </>
        )}
      </main>
    </div>
  );
};

export default App;