export default function FilterControls({ filter, setFilter }) {
  return (
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
  );
}
