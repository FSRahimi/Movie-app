import { useState } from "react";
import { Search } from "lucide-react";

const API_KEY = "314e4ff8"; // replace with your OMDB API key
 // replace with your OMDB API key

export default function MovieSearch({ addMovie }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${query.trim()}&apikey=${API_KEY}`
      );
      const data = await res.json();
      if (data.Search) setResults(data.Search);
      else setResults([]);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movie-search">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn search-btn">
          <Search size={18} />
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <div className="search-results">
        {results.map((movie) => (
          <div key={movie.imdbID} className="search-card">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
              alt={movie.Title}
            />
            <h4>{movie.Title}</h4>
            <p>{movie.Year}</p>
            <button
              className="btn add-btn"
              onClick={() => addMovie({ title: movie.Title, genre: "Unknown" })}
            >
              + Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
