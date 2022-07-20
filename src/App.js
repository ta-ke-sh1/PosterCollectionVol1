import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Homepage from "./components/homepage";
import Gallery from "./components/gallery";
import Locomotive from "./components/locomotive";
import "./styles/root.scss";

const App = () => {
    const routes = useRoutes([
        { path: "/", element: <Homepage /> },
        { path: "/gallery", element: <Gallery /> },
        { path: "/locomotive", element: <Locomotive /> },
    ]);
    return routes;
};

const AppWrapper = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default AppWrapper;
