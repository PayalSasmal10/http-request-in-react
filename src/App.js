import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  
  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  
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
    setIsLoding(true);
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
      setIsLoding(false);
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoding &&  movies.length>0 && <MoviesList movies={movies} />}
        {!isLoding && movies.length === 0 && <p>Found no movies</p>}
        {isLoding && <p>Loading....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
