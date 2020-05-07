import React, {useState, useEffect} from 'react';
import axios from 'axios';

import SavedList from './Movies/SavedList';
// My Imports
import {Route} from 'react-router-dom';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

const App = () => {
    const [savedList,
        setSavedList] = useState([]);
    const [movieList,
        setMovieList] = useState([]);

    useEffect(() => {
        const getMovies = () => {
            axios
                .get('http://localhost:5000/api/movies')
                .then(response => {
                    console.log(response.data);
                    setMovieList(response.data);
                })
                .catch(error => {
                    console.error('Server Error', error);
                });
        }
        getMovies();
    }, []);

    const addToSavedList = movie => {setSavedList([...savedList,movie]); };

    return (
        <div>
            <SavedList list={savedList}/> {/* // my routes */}
            <Route exact path="/" render={() => <MovieList movies={movieList}/>}/>
            <Route path="/movies/:id" component={Movie} />
        </div>
    );
};

export default App;
