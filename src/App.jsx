import React, { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import MovieList from "./Components/MovieList/MovieList";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="App">
      <Navbar setSearchQuery={setSearchQuery} />
      
      <main className="main_content">
        {searchQuery ? (
          <MovieList 
            category="popular" 
            searchQuery={searchQuery}
            isFirst={false}
          />
        ) : (
          <>
            <MovieList 
              category="popular" 
              isFirst={true}
            />
            <MovieList 
              category="top_rated" 
              isFirst={false}
            />
            <MovieList 
              category="upcoming" 
              isFirst={false}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;