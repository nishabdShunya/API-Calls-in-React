import React from "react";

import "./Movie.css";

const Movie = (props) => {
  const removeButtonClickHandler = () => {
    props.onRemoveMovie(props.id);
  };

  return (
    <li className="movie">
      <div>
        <button className="delete-btn" onClick={removeButtonClickHandler}>
          &times;
        </button>
      </div>
      <div>
        <h2>{props.title}</h2>
        <h3>{props.releaseDate}</h3>
        <p>{props.openingText}</p>
      </div>
    </li>
  );
};

export default Movie;
