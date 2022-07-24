import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Homepage from "./components/homepage";
import Gallery from "./components/gallery";
import Test from './components/galleryTest'

const App = () => {
    const routes = useRoutes([
        { path: "/", element: <Homepage /> },
        { path: "/gallery", element: <Gallery /> },
        { path: "/test", element: <Test /> },
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
