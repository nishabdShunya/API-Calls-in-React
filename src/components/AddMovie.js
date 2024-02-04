import React, { useState } from "react";
import "./AddMovie.css";

const AddMovie = (props) => {
  const [movie, setMovie] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });

  const titleChangeHandler = (event) => {
    setMovie((prevMovie) => {
      return { ...prevMovie, title: event.target.value };
    });
  };

  const openingTextChangeHandler = (event) => {
    setMovie((prevMovie) => {
      return { ...prevMovie, openingText: event.target.value };
    });
  };

  const releaseDateChangeHandler = (event) => {
    setMovie((prevMovie) => {
      return { ...prevMovie, releaseDate: event.target.value };
    });
  };

  const addMovieHandler = (event) => {
    event.preventDefault();
    props.onAddMovie(movie);
    setMovie({ title: "", openingText: "", releaseDate: "" });
  };

  return (
    <form onSubmit={addMovieHandler}>
      <div className="form-controls">
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={movie.title}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="opening-text">Opening Text</label>
          <textarea
            id="opening-text"
            rows="4"
            value={movie.openingText}
            onChange={openingTextChangeHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="release-date">Release Date</label>
          <input
            type="date"
            id="release-date"
            value={movie.releaseDate}
            onChange={releaseDateChangeHandler}
          />
        </div>
      </div>
      <div className="form-actions">
        <button type="submit">Add Movie</button>
      </div>
    </form>
  );
};

export default AddMovie;
