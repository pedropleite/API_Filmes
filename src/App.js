import React, { useState, useEffect, useCallback } from 'react';
import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMovies = useCallback(() => {
        setIsLoading(true);
        fetch('https://react-http-5d767-default-rtdb.firebaseio.com/movies.json')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const loadedMovies = [];
                for (const key in data) {
                    loadedMovies.push({
                        ...data[key],
                        id: key,
                    });
                }
                setMovies(loadedMovies);
            })
            .catch((error) => {
                setError(error.message);
            });
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies, movies]);

    const addMovieHandler = (movie) => {
        fetch('https://react-http-5d767-default-rtdb.firebaseio.com/movies.json', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Something went wrong');
                }
            })
            .catch((error) => setError(error.message));
    };

    return (
        <React.Fragment>
            <section>
                <AddMovie onAddMovie={addMovieHandler} />
            </section>
            <section>
                <button onClick={fetchMovies}>Fetch Movies</button>
            </section>
            <section>
                {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
                {!isLoading && movies.length === 0 && !error && <p>No movies found.</p>}
                {!isLoading && error && <p>{error}</p>}
                {isLoading && <p>Loading...</p>}
            </section>
        </React.Fragment>
    );
}

export default App;
