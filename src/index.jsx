import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';

//Import statement to indicate that I need to bundle `./index.scss`
import "./index.scss";

const App = () => {
    return <MainView />;
};

//Finds the root of my app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render my app in the root DOM element
root.render(<App />);