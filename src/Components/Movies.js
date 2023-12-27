import React from 'react';

import classes from './Movies.module.css';

const Movie = (props) => {
  const deleteMovieHandler = async (id) => {
    try {
      const response = await fetch(
        `https://react-http-77fa7-default-rtdb.firebaseio.com/movies/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }
      props.setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== id)
      );
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={() => deleteMovieHandler(props.id)}>Delete</button>
    </li>
  );
};

export default Movie;