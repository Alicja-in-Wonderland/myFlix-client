import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const UserEdit = ({ user, token, updateUser, onLoggedOut }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://myflix-db.herokuapp.com/users/${username}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            }).then((response) => {
                if (response.ok) {
                    alert("User information has been updated!");
                    onLoggedOut();
                } else {
                    console.log(data);
                    alert("Something Wrong");
                }
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2 className="text-center ivory-text">Update Your Profile</h2>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                    minLength="3"
                    required
                />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Update
            </Button>
        </Form>
    );
};