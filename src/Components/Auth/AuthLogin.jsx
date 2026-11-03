import { Link, useNavigate } from "react-router-dom";
import {
    loginUser,
    logoutUser,
    getCurrentUser
} from "../../Services/AuthService.js";
import { useState } from "react";

// Auth login only needsan email and a password
function AuthLogin() {
    // JS object 
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUser({
            ...user, // spreader 
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        loginUser(user.email, user.password) // Promise
            .then((result) => {
                console.log("Login successful:", result.id);
                navigate("/", { replace: true});
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                console.log("Logout sucessful",);
                navigate("/login", { replace: true });
            })
            .catch((error) => {
                console.log("Logout failed:", error.message);
            });
    };

    return (
        <div>
            <h1>Notre Dame Football Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="loginEmail">Email</label>
                <br />
                <input
                    id="loginEmail"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />

                <br />
                <label htmlFor="loginPassword">Password</label>
                <br />
                <input
                    id="loginPassword"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />

                <br />
                <button type="submit">Log In</button>
            </form>
            {error && <p role="alert">{error}</p>}

            <button type="button" onClick={handleLogout}>Log Out</button>


            <p>
                Dont't have an account? <Link to="/auth">Register Here</Link>
            </p>
        </div>
    );
}

export default AuthLogin;
