import PropTypes from "prop-types";

//Info displayed once user clicks a movie title
export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.ImagePath} />
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
            <button onClick={onBackClick}>Back</button>
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
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};