import PropTypes from "prop-types";
import React from "react"
//The MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.Title}
        </div>
    );
};

//Defines all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};