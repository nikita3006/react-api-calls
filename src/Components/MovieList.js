import React from 'react';

import Movie from './Movies';
import classes from './MovieList.module.css';

const MovieList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.release}
          openingText={movie.openingText}
          setMovies={props.setMovies}
        />
      ))}
    </ul>
  );
};

export default MovieList;