import { useMemo, useState } from "react";
import { Filter } from "./components/Filter.jsx";
import { MovieList } from "./components/MovieList.jsx";
import { initialMovies } from "./data/initialMovies.js";
import "./App.css";

function normalizeTitle(s) {
  return s.trim().toLowerCase();
}

function nextId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `movie-${Date.now()}`;
}

export default function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [titleQuery, setTitleQuery] = useState("");
  const [minRating, setMinRating] = useState(0);

  const [draftTitle, setDraftTitle] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const [draftPosterURL, setDraftPosterURL] = useState("");
  const [draftRating, setDraftRating] = useState("8");

  const filteredMovies = useMemo(() => {
    const q = normalizeTitle(titleQuery);
    return movies.filter((m) => {
      const titleOk = q === "" || normalizeTitle(m.title).includes(q);
      const ratingOk = m.rating >= minRating;
      return titleOk && ratingOk;
    });
  }, [movies, titleQuery, minRating]);

  function handleAddMovie(e) {
    e.preventDefault();
    const rating = Number(draftRating);
    if (!draftTitle.trim() || !draftPosterURL.trim() || Number.isNaN(rating)) {
      return;
    }
    setMovies((prev) => [
      {
        id: nextId(),
        title: draftTitle.trim(),
        description: draftDescription.trim() || "No description provided.",
        posterURL: draftPosterURL.trim(),
        rating: Math.min(10, Math.max(0, rating)),
      },
      ...prev,
    ]);
    setDraftTitle("");
    setDraftDescription("");
    setDraftPosterURL("");
    setDraftRating("8");
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Favorite movies &amp; shows</h1>
        <p className="app__lede">
          Browse the starter list (Avengers saga, DC&apos;s <em>Injustice</em>, and Marvel series), filter by title or
          minimum rating, then add your own picks.
        </p>
      </header>

      <main className="app__main">
        <div className="app__sidebar">
          <Filter
            titleQuery={titleQuery}
            onTitleChange={setTitleQuery}
            minRating={minRating}
            onMinRatingChange={setMinRating}
          />

          <section className="add-movie" aria-labelledby="add-movie-heading">
            <h2 id="add-movie-heading" className="add-movie__heading">
              Add a movie or show
            </h2>
            <form className="add-movie__form" onSubmit={handleAddMovie}>
              <label className="add-movie__label">
                Title
                <input
                  className="add-movie__input"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  required
                  placeholder="Title"
                />
              </label>
              <label className="add-movie__label">
                Description
                <textarea
                  className="add-movie__textarea"
                  value={draftDescription}
                  onChange={(e) => setDraftDescription(e.target.value)}
                  rows={3}
                  placeholder="Short synopsis"
                />
              </label>
              <label className="add-movie__label">
                Poster URL
                <input
                  className="add-movie__input"
                  type="url"
                  value={draftPosterURL}
                  onChange={(e) => setDraftPosterURL(e.target.value)}
                  required
                  placeholder="https://…"
                />
              </label>
              <label className="add-movie__label">
                Rating (0–10)
                <input
                  className="add-movie__input"
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  value={draftRating}
                  onChange={(e) => setDraftRating(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="add-movie__submit">
                Add to list
              </button>
            </form>
          </section>
        </div>

        <div className="app__content">
          <MovieList movies={filteredMovies} />
        </div>
      </main>

      <footer className="app__footer">
        Poster images for the starter titles are hosted on{" "}
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          TMDB
        </a>
        .
      </footer>
    </div>
  );
}
