import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  
  const [movies, setMovies] = useState([]);
  
  // Using promise
  /*function fetchMoviesHandler() {
    fetch("https://swapi.dev/api/films").then(response => {
      return response.json();
    }).then(data => {
      const tranformedMovies = data.results.map(movieData =>{
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };
      });
      setMovies(tranformedMovies);
    });
  }*/

  async function fetchMoviesHandler() {
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    
    const tranformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };
      });
      setMovies(tranformedMovies);
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
