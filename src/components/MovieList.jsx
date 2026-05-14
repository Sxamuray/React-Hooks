import { MovieCard } from "./MovieCard.jsx";

/**
 * @param {{ movies: import('../data/types').Movie[] }} props
 */
export function MovieList({ movies }) {
  if (movies.length === 0) {
    return (
      <p className="movie-list__empty" role="status">
        No titles match your filters. Try a different title or minimum rating.
      </p>
    );
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id} className="movie-list__item">
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}
