import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate } from "react-router-dom";

//COMPONENTS
import EditMovieForm from "./components/EditMovieForm";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';
import AddMovieForm from "./components/AddMovieForm";

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Make a DELETE request using Axios
    // On success update the movies list in state
    // and navigate the user to /movies
    // Hand this function down to the correct component
  const deleteMovie = (id) => {
    setMovies(movies.filter(item => (item.id !== Number(id))));
  }

  const addToFavorites = (movie) => {
    // Stretch goal, see the README
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />
          
          <Routes>
            <Route
              path="movies/edit/:id"
              element={<EditMovieForm setMovies={setMovies} />}
            />

            <Route path="movies/:id" 
              element={
                <Movie
                setMovies={setMovies}
                setFavoriteMovies={setFavoriteMovies}
                favoriteMovies={favoriteMovies}
                deleteMovie={deleteMovie}
                />}
            />

            <Route
              path="movies/add"
              element={<AddMovieForm 
              setMovies={setMovies} />}
            />

            <Route 
              path="movies" 
              element={<MovieList movies={movies} />} 
            />

            <Route 
              path="/" 
              element={<Navigate to="/movies" />} 
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
