import { useState } from "react";
import "./App.css"; // import separate CSS file

export default function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Action");
  const [filter, setFilter] = useState("All");

  // Add Movie
  function handleAddMovie(e) {
    e.preventDefault();
    if (!title.trim()) return;

    const newMovie = {
      id: crypto.randomUUID(),
      title: title.trim(),
      genre,
      watched: false,
    };

    setMovies([...movies, newMovie]);
    setTitle("");
    setGenre("Action");
  }

  // Toggle watched
  function toggleWatched(id) {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    );
  }

  // Delete movie
  function deleteMovie(id) {
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  // Derived state
  const filteredMovies = movies.filter((movie) => {
    if (filter === "Watched") return movie.watched;
    if (filter === "Unwatched") return !movie.watched;
    return true;
  });

  const totalMovies = movies.length;
  const watchedCount = movies.filter((m) => m.watched).length;
  const unwatchedCount = totalMovies - watchedCount;

  return (
    <div className="container">
      <h1>🎬 Movie Watchlist</h1>

      {/* Add Movie Form */}
      <form className="add-form" onSubmit={handleAddMovie}>
        <input
          type="text"
          placeholder="Movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option>Action</option>
          <option>Drama</option>
          <option>Comedy</option>
          <option>Sci-Fi</option>
        </select>
        <button type="submit" className="btn add-btn">
          + Add Movie
        </button>
      </form>

      {/* Filter Controls */}
      <div className="filters">
        {["All", "Watched", "Unwatched"].map((f) => (
          <button
            key={f}
            className={`btn filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Movie List */}
      <ul className="movie-list">
        {filteredMovies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <div>
              <strong>{movie.title}</strong> ({movie.genre}){" "}
              <span
                className={`badge ${movie.watched ? "watched" : "unwatched"}`}
              >
                {movie.watched ? "Watched ✅" : "Unwatched ❌"}
              </span>
            </div>
            <div className="movie-actions">
              <button
                className="btn toggle-btn"
                onClick={() => toggleWatched(movie.id)}
              >
                Toggle
              </button>
              <button
                className="btn delete-btn"
                onClick={() => deleteMovie(movie.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Conditional Rendering */}
      {filteredMovies.length === 0 && <p className="empty-msg">No movies found. Add one!</p>}
      {totalMovies > 0 && watchedCount === totalMovies && <p className="all-watched">🎉 You watched everything!</p>}

      {/* Summary */}
      <div className="summary">
        <p>Total Movies: {totalMovies}</p>
        <p>Watched: {watchedCount}</p>
        <p>Unwatched: {unwatchedCount}</p>
      </div>
    </div>
  );
}
