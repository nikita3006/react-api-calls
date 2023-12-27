import './App.css';
import React, { useState , useEffect, useCallback } from "react";
import MovieList from "./Components/MovieList";
import AddMoviesForm from './Components/AddMoviesForm';

function App() {  

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://react-http-77fa7-default-rtdb.firebaseio.com/movies.json");
      if(!response.ok){
        throw new Error('Something went wrong....Retrying')
        }
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
          loadedMovies.push({
            id : key,
            title : data[key].title,
            openingText : data[key].openingText,
            releaseDate : data[key].releaseDate
          });
      };
      setMovies(loadedMovies);
    }

    catch(error) {
      setError(error.message)
      // setTimeout(fetchMoviesHandler,5000)
    }
    setIsLoading(false);
  },[]);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    const response= await fetch("https://react-http-77fa7-default-rtdb.firebaseio.com/movies.json", {
      method : "POST",
      body : JSON.stringify(movie),
      headers : {
        'Content-Type' : 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    fetchMoviesHandler();
  }

  const cancelHandler = () => {
    setMovies(false)
    setError(false)
  }

  let content =<p>Found no movies</p>

  if(movies.length > 0){
    content = <MovieList movies={movies} setMovies={setMovies}/>
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
        <AddMoviesForm onAddMovie={addMovieHandler} />
      </section>
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
