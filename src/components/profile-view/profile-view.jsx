import React from "react";
import { UserInfo } from "./user-info";
import { UserEdit } from "./user-edit";
import { MovieCard } from "../movie-card/movie-card";
import { Col, Button } from "react-bootstrap";

export const ProfileView = ({ user, token, movies, updateUser, onLoggedOut }) => {
    let favouriteMovies = movies.filter((movie) => user.Favourites.includes(movie.movieId)
    );

    const deleteAccount = () => {
        fetch(`https://myflix-db.herokuapp.com/users/${username}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            if (response.ok) {
                alert("Account has been deleted!");
                onLoggedOut();
            } else {
                alert(" Could not delete account");
            }
        }).catch((e) => {
            alert(e);
        });
    };

    return (
        <>
            <Col>
                <UserInfo user={user} />
                <UserEdit
                    user={user}
                    token={token}
                    updateUser={updateUser}
                    onLoggedOut={onLoggedOut}
                />
                <Button variant="danger" type="submit"
                    onClick={() => {
                        if (confirm("Are you sure you want to delete your account?")) {
                            deleteAccount();
                        }
                    }}
                >Delete Your Account</Button>
            </Col>
            <Col>
                <h3>Your Favourite Movies</h3>
            </Col>
            {favouriteMovies.map((movie) => (
                <Col key={movie.movieId} className="mb-4" xl={2} lg={3} md={4} xs={6}>
                    <MovieCard movie={movie} />
                </Col>
            ))}
        </>
    );
};