import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
    const [movies, setMovies] = useState([
        { id: 1, title: "The Dark Knight" },
        { id: 2, title: "Silence of the Lambs" },
        { id: 3, title: "Se7en" }
    ]);

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    } else {
        return (
            <div>
                {movies.map((movie) => (
                    <MovieCard movie={movie} />
                ))}
            </div>
        );
    }
};