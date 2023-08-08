import React from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

//Info displayed once user clicks a movie title
export const MovieView = ({ movies, user, token, updateUser, onBackClick }) => {
    const { movieId } = useParams();
    const movie = movies.find((movie) => movie.movieId === movieId);

    const [isFavouriteMovie, setAsFavourite] = useState(
        user.Favourites.includes(movie.movieId)
    );

    useEffect(() => {
        setAsFavourite(user.Favourites.includes(movie.movieId));
        window.scrollTo(0, 0);
    }, [movieId]);

    const addFavourite = () => {
        fetch(`https://myflix-db.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        }
        ).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed");
                return false;
            }
        }).then((user) => {
            if (user) {
                alert("Successfully added to favourites");
                setAsFavourite(true);
                updateUser(user);
            }
        }).catch((e) => {
            alert(e);
        });
    };

    const removeFavourite = () => {
        fetch(`https://myflix-db.herokuapp.com/users/${user.Username}/movies/${movieId}`,
            {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Failed");
                    return false;
                }
            })
            .then((user) => {
                if (user) {
                    alert(`"${movie.Title}" Successfully deleted from favorites`);
                    setAsFavourite(false);
                    updateUser(user);
                }
            })
            .catch((e) => {
                alert(e);
            });
    };

    return (
        <div>
            <div>
                <img className="w-100" src={movie.ImagePath} alt="Movie poster" />
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
                <Button variant="primary">Back</Button>
            </Link>
            {isFavouriteMovie ? (
                <Button
                    variant="danger"
                    className="ms-2 mt-4 mb-4"
                    onClick={removeFavourite}
                >
                    Remove from Favourites
                </Button>
            ) : (
                <Button
                    variant="primary"
                    className="ms-2 mt-4 mb-4"
                    onClick={addFavourite}
                >
                    Add to Favourites
                </Button>
            )}
        </div>
    );
};