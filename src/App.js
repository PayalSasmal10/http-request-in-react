import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

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

  const fetchMoviesHandler = useCallback( async () => {
    setIsLoding(true);
    setError(null);
    try{
      const response = await fetch("https://react-http-4caa5-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json");
      if(!response.ok){
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      console.log(data);

      const loadedMovies = [];
      
      for(const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        });
      }

      // This if for 
      /*const tranformedMovies = data.results.map(movieData => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          };
        });*/

        setMovies(loadedMovies);
      }catch(error){
        setError(error.message);
      }
      setIsLoding(false);
    
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  async function addMovieHandler(movie){
    const response = await fetch("https://react-http-4caa5-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",{
      method: "POST",
      body: JSON.stringify(movie),
      headers : {
        'Content-type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />

      </section>
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
