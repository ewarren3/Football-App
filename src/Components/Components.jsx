import Main from "./Main/Home.jsx";
import GameDetails from "./GameDetails/GameDetails.jsx";
import Auth from "./Auth/Auth.jsx";
import AuthLogin from "./Auth/AuthLogin.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import AuthRegister from "./Auth/AuthRegister.jsx";


// Defines the different modules of the application
export default function Components() {
  return (
    <Router>
      <Routes>
        {/* Route to the football schedule */}
        {/* <Route path="/main" element={<Main />} /> */}
        <Route path="/main" element={<ProtectedRoute element={Main} />} />

        {/* Route to the game details module */}
        {/* <Route path="/games/:gameId" element={<GameDetails />} /> */}
        <Route path="/games/:gameId" element={<ProtectedRoute element={GameDetails} />} />

        {/* Route to the auth form*/}
        <Route path="/" element={<Auth />} />

        {/* Route to the login form */}
        <Route path="/login" element={<AuthLogin />} />

        {/* Route to the register form */}
        <Route path="/register" element={<AuthRegister />} />

      </Routes>
    </Router>
  );
}

// Future work: Consider adding a 404 Not Found route to handle undefined paths and improve user experience.