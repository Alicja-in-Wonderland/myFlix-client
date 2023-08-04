import React from "react";
import { useState, useEffect } from "react";
import { Col, Row, Button, Form, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

export const ProfileView = ({ user, token, movie, movies, onLoggedOut, onRemoveFavourite }) => {
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    /*let favouriteMovies = movies.filter((movie) => {
        return user.Favourites.includes(movie.id)
    })*/

    useEffect(() => {
        fetch(`https://myflix-db.herokuapp.com/users/${username}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        }).then((response) => response.json()).then((data) => {
            console.log(data);
            setUserData(data);
            setUsername(data.Username);
            setPassword(data.Password);
            setEmail(data.Email);
            setBirthday(data.Birthday);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    }, [user, token]);

    const handleUpdate = (e) => {
        e.preventDefault();
        // Make a PUT request to update user's info
        fetch(`https://myflix-db.herokuapp.com/users/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the user information state variables if needed
                console.log('User information updated:', data);
            })
            .catch((error) => {
                console.log('Error updating user information:', error);
            });
    };

    const handleDeregister = () => {
        // Make a DELETE request to deregister the user
        fetch(`https://myflix-db.herokuapp.com/users/${username}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.status === 204) {
                    // User deregistration successful
                    onLoggedOut();
                    console.log('User deregistered successfully.');
                } else {
                    console.log('User deregistration failed.');
                }
            })
            .catch((error) => {
                console.log('Error deregistering user:', error);
            });
    };

    return (
        <Container>
            <Row className='justify-content-end'>
                <Col>
                    <Link to='/' className='btn btn-secondary m-1'>
                        Back
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Profile</h2>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId='username'>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId='birthday'>
                            <Form.Label>Date of Birth:</Form.Label>
                            <Form.Control type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                        </Form.Group>

                        <Button variant='primary' type='submit' className='m-1'>
                            Update
                        </Button>
                    </Form>

                    <p>Email: {user.Email}</p>
                    <p>Favourite Movies:</p>
                    <ul>
                        {user.Favourites.length > 0 ? (
                            user.Favourites.map((movieId) => {
                                const movie = movies.find((movie) => movie._id === movieId);
                                return (
                                    <li key={movie._id}>
                                        {movie ? (
                                            <>
                                                {movie.Title}
                                                <Button
                                                    variant='danger'
                                                    size='sm'
                                                    className='ml-2'
                                                    onClick={() => onRemoveFavourite(movieId)}
                                                >
                                                    Remove
                                                </Button>
                                            </>
                                        ) : null}
                                    </li>
                                );
                            })
                        ) : (
                            <li>No favourite movies selected</li>
                        )}
                    </ul>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col>
                    <Button variant='danger' className='mt-2 mb-3' onClick={handleDeregister}>
                        Deregister
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};
