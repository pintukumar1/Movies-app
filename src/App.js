import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchedMovies = async() => {
      setLoading(true);
      const response = await fetch('https://swapi.dev/api/films/')
      const data = await response.json();

          const transformedMovies = data.results.map(movieData => {
            return {
              id: movieData.episode_id,
              title: movieData.title,
              openingText: movieData.opening_crawl,
              releaseDate: movieData.release_date
            }
          })
          setMovies(transformedMovies);
          setLoading(false);
        }    

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchedMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} /> }
        {isLoading && <p style={{color: 'red'}}> Loading........ </p>}
      </section>
    </React.Fragment>
  );
}

export default App;
