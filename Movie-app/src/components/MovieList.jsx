import { Trash2, CheckCircle } from "lucide-react";

export default function MovieList({ movies, filter, toggleWatched, deleteMovie }) {
  const filteredMovies = movies.filter((movie) => {
    if (filter === "Watched") return movie.watched;
    if (filter === "Unwatched") return !movie.watched;
    return true;
  });

  if (filteredMovies.length === 0) {
    return <p className="empty-msg">No movies found. Add one!</p>;
  }

  return (
    <div className="movie-grid">
      {filteredMovies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <h4>{movie.title}</h4>
          <p>{movie.genre}</p>
          <div className="card-actions">
            <button
              onClick={() => toggleWatched(movie.id)}
              className={`btn ${movie.watched ? "watched" : ""}`}
            >
              <CheckCircle size={18} /> {movie.watched ? "Watched" : "Unwatched"}
            </button>
            <button
              onClick={() => deleteMovie(movie.id)}
              className="btn delete-btn"
            >
              <Trash2 size={18} /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
