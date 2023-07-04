import { useState } from "react";

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
                {movies.map((movie) => {
                    return <div key={movie.id}>{movie.title}</div>;
                })}
            </div>
        );
    }
};