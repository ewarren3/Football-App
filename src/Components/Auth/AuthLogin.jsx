
import { useState } from "react";
import { loginUser } from "../../Services/AuthService.js";

// Auth login only needsan email and a password
function AuthLogin() {
    // JS object 
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

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
            })
            .catch((error) => {
                console.error("Login failed:", error.message);
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
        </div>
    );
}

export default AuthLogin;
