import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "The Dark Knight",
            image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
            description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            genre: "Action",
            director: "Christopher Nolan"
        },
        {
            id: 2,
            title: "Silence of the Lambs",
            image: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
            description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.",
            genre: "Thriller",
            director: "Jonathan Demme"
        },
        {
            id: 3,
            title: "Se7en",
            image: "https://m.media-amazon.com/images/M/MV5BODhjMTZjZTUtMmFhOS00NmJmLWE2ZjMtOTYyMmQ3NTY4MjMyXkEyXkFqcGdeQXVyMzAxNjg3MjQ@._V1_FMjpg_UX1000_.jpg",
            description: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
            genre: "Thriller",
            director: "David Fincher"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    } else {
        return (
            <div>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                ))}
            </div>
        );
    }
};