import { useState } from "react";
import AddMovieForm from "./components/AddMovieForm";
import FilterControls from "./components/FilterControls";
import MovieList from "./components/MovieList";
import Summary from "./components/Summary";
import MovieSearch from "./components/MovieSearch";
import "./App.css";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("All");

  // Add movie
  const addMovie = (movie) => {
    // Prevent duplicates
    if (!movies.some((m) => m.title === movie.title)) {
      setMovies([...movies, { ...movie, id: crypto.randomUUID(), watched: false }]);
    }
  };

  // Toggle watched
  const toggleWatched = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  // Delete movie
  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div className="container">
      <h1>🎬 Movie Watchlist</h1>

      {/* Search Movies from OMDB */}
      <MovieSearch addMovie={addMovie} />

      {/* Add Movie Manually */}
      <AddMovieForm addMovie={addMovie} />

      {/* Filter Controls */}
      <FilterControls filter={filter} setFilter={setFilter} />

      {/* Movie List */}
      <MovieList
        movies={movies}
        filter={filter}
        toggleWatched={toggleWatched}
        deleteMovie={deleteMovie}
      />

      {/* Summary */}
      <Summary movies={movies} />
    </div>
  );
}
