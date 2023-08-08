import React from "react";
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import Button from "react-bootstrap/Button";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SearchBar } from "../search-bar/search-bar";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [filteredMovies, setFilteredMovies] = useState([]); // State to hold the filtered movies
    const updateUser = (user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    useEffect(() => {
        if (!token) return;

        fetch("https://myflix-db.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const moviesFromApi = data.map((movie) => {
                    return {
                        movieId: movie._id,
                        Title: movie.Title,
                        Description: movie.Description,
                        Genre: {
                            Name: movie.Genre.Name,
                        },
                        Director: {
                            Name: movie.Director.Name,
                        },
                        Featured: movie.Featured,
                        ImagePath: movie.ImagePath
                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);

    // Define the onBackClick function in the MainView component
    const handleBackClick = () => { };

    // Function to update the filtered movies when the user searches
    const handleMovieSearch = (filteredMovies) => {
        setFilteredMovies(filteredMovies);
    };

    return (
        <BrowserRouter>
            <Row>
                <Col>
                    <NavigationBar
                        user={user}
                        onLoggedOut={() => {
                            setUser(null);
                            setToken(null);
                            localStorage.clear();
                        }}
                    />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user, token) => {
                                            setUser(user);
                                            setToken(token);
                                        }} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView
                                            movies={movies}
                                            user={user}
                                            token={token}
                                            updateUser={updateUser}
                                            onBackClick={handleBackClick} // Pass the callback function as a prop
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        <Col className="mb-4" md={12}>
                                            <SearchBar
                                                movies={movies}
                                                handleMovieSearch={handleMovieSearch} // Pass the callback function
                                            />
                                        </Col>
                                        {filteredMovies.length === 0 ? (
                                            movies.map((movie) => (
                                                <Col className="mb-4" key={movie._id} md={3}>
                                                    <MovieCard movie={movie} />
                                                </Col>
                                            ))
                                        ) : (
                                            //Render the filtered movies
                                            <>
                                                {filteredMovies.map((movie) => (
                                                    <Col className="mb-4" key={movie._id} md={3}>
                                                        <MovieCard movie={movie} />
                                                    </Col>
                                                ))}
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <>
                                        <Col>
                                            <ProfileView
                                                user={user}
                                                token={token}
                                                movies={movies}
                                                onLoggedOut={() => {
                                                    setUser(null);
                                                    setToken(null);
                                                    localStorage.clear();
                                                }}
                                                updateUser={updateUser}
                                            />
                                        </Col>
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
