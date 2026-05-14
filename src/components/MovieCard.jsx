function StarRow({ value, max = 10 }) {
  const filled = Math.round((value / max) * 5);
  return (
    <span className="movie-card__stars" aria-label={`Rating ${value} out of ${max}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < filled ? "star star--on" : "star"}>
          ★
        </span>
      ))}
    </span>
  );
}

/**
 * @param {{ movie: import('../data/types').Movie }} props
 */
export function MovieCard({ movie }) {
  const { title, description, posterURL, rating } = movie;

  return (
    <article className="movie-card">
      <div className="movie-card__poster-wrap">
        <img
          className="movie-card__poster"
          src={posterURL}
          alt={`Poster for ${title}`}
          loading="lazy"
          width={500}
          height={750}
        />
      </div>
      <div className="movie-card__body">
        <h2 className="movie-card__title">{title}</h2>
        <p className="movie-card__desc">{description}</p>
        <div className="movie-card__footer">
          <StarRow value={rating} />
          <span className="movie-card__score">{rating.toFixed(1)}/10</span>
        </div>
      </div>
    </article>
  );
}
