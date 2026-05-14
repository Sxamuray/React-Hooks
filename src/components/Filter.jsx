/**
 * @param {{
 *   titleQuery: string;
 *   onTitleChange: (value: string) => void;
 *   minRating: number;
 *   onMinRatingChange: (value: number) => void;
 * }} props
 */
export function Filter({ titleQuery, onTitleChange, minRating, onMinRatingChange }) {
  return (
    <section className="filter" aria-labelledby="filter-heading">
      <h2 id="filter-heading" className="filter__heading">
        Filter
      </h2>
      <div className="filter__row">
        <label className="filter__label" htmlFor="filter-title">
          Title contains
        </label>
        <input
          id="filter-title"
          className="filter__input"
          type="search"
          placeholder="e.g. Avengers, Daredevil…"
          value={titleQuery}
          onChange={(e) => onTitleChange(e.target.value)}
          autoComplete="off"
        />
      </div>
      <div className="filter__row">
        <label className="filter__label" htmlFor="filter-rating">
          Minimum rating ({minRating.toFixed(1)} / 10)
        </label>
        <input
          id="filter-rating"
          className="filter__range"
          type="range"
          min={0}
          max={10}
          step={0.5}
          value={minRating}
          onChange={(e) => onMinRatingChange(Number(e.target.value))}
        />
      </div>
    </section>
  );
}
