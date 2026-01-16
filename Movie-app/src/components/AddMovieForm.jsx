import { useState } from "react";

export default function AddMovieForm({ addMovie }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Action");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addMovie({ title, genre });
    setTitle("");
    setGenre("Action");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
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
  );
}
