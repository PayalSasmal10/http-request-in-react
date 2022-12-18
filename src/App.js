import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  
  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState(null);
  
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
    setError(null);
    try{
      const response = await fetch("https://swapi.dev/api/film");
      if(!response.ok){
        throw new Error("Something went wrong!");
      }
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
      }catch(error){
        setError(error.message);
      }
      setIsLoding(false);
    
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoding &&  movies.length>0 && <MoviesList movies={movies} />}
        {!isLoding && movies.length === 0 && !error && <p>Found no movies</p>}
        {!isLoding && error && <p>{error}</p>}
        {isLoding && <p>Loading....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
