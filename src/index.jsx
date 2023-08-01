import React from "react"
import ReactDOM from "react-dom"
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';

//Import statement to indicate that I need to bundle `./index.scss`
import "./index.scss";

const App = () => {
    return (
        <Container style={{ border: "1px solid blue" }}>
            <MainView />
        </Container>
    );
};

//Finds the root of my app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render my app in the root DOM element
root.render(<App />);