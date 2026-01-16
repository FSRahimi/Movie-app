export default function Summary({ movies }) {
  const totalMovies = movies.length;
  const watchedCount = movies.filter((m) => m.watched).length;
  const unwatchedCount = totalMovies - watchedCount;

  return (
    <div className="summary">
      <p>Total Movies: {totalMovies}</p>
      <p>Watched: {watchedCount}</p>
      <p>Unwatched: {unwatchedCount}</p>
      {totalMovies > 0 && watchedCount === totalMovies && (
        <p className="all-watched">🎉 You watched everything!</p>
      )}
    </div>
  );
}
