import './App.css';
import React, { useState } from "react";
import MovieList from "./Components/MovieList";

function App() {  

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/film/");
      if(!response.ok){
        throw new Error('Something went wrong....Retrying')
        }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    }
    catch(error) {
      setError(error.message)
      setTimeout(fetchMoviesHandler,5000)
    }
    setIsLoading(false);
  }


  const cancelHandler = () => {
    setMovies(false)
    setError(false)
  }

  let content =<p>Found no movies</p>

  if(movies.length > 0){
    content = <MovieList movies={movies} />
  }
  if(error){
    content=<p>{error}</p>
  }
  if(isLoading){
    content=<p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        <button onClick={cancelHandler}>Cancel</button>
      </section>
    </React.Fragment>
  );
}

export default App;
