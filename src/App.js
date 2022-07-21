import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Homepage from "./components/homepage";
import Gallery from "./components/gallery";

const App = () => {
    const routes = useRoutes([
        { path: "/", element: <Homepage /> },
        { path: "/gallery", element: <Gallery /> },
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
