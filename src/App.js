import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error,setError] = useState(null)

  const fetchMoviesHandler = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://movies-app-d380c-default-rtdb.firebaseio.com/movies.json')

        if(!response.ok) {
          throw new Error('Something went wrong !!!')
        }
        const data = await response.json();

        const loadedMovies = [];

        for (const key in data) {
          loadedMovies.push({
            id: key,
            title: data[key].title,
            release: data[key].releaseDate,
            openingText: data[key].openingText
          })          
        }
          console.log(loadedMovies);
          setMovies(loadedMovies);
      }
      catch(error) {
        setError(error.message);
      }
      setLoading(false);
    }, [])    

    useEffect(() => {
      fetchMoviesHandler();
    }, [fetchMoviesHandler])

    const addMovieHandler = async(movie) => {
      const response = await fetch('https://movies-app-d380c-default-rtdb.firebaseio.com/movies.json', {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      const data = await response.json()
      console.log(data);
    }

    let content = <p>Found no movies...</p>

    if(movies.length > 0 ) {
      content = <MoviesList movies={movies} />
    }

    if(error) {
      content = <p>{error}</p>
    }

    if(isLoading) {
      content = <p>Loading......</p>
    }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>fetch movies</button>
      </section>
      <section>
        {content}  
      </section>
    </React.Fragment>
  );
}

export default App;
