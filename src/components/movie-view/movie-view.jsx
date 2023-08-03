import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

//Info displayed once user clicks a movie title
export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((movie) => movie.movieId === movieId);

    return (
        <div>
            <div>
                <img className="w-100" src={movie.ImagePath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};

//Defines all the props constraints for the MovieView
MovieView.propTypes = {
    movie: PropTypes.shape({
        ImagePath: PropTypes.string,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        })
    }).isRequired
};