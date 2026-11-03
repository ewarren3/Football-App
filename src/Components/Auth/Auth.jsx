// Parent authentication component
//import {Link} from "react-router-dom";
import { useState } from "react";
import AuthForm from "./AuthForm.jsx";
import { createUser } from "../../Services/AuthService.js";
// Buttons with some links to register and login

const Auth = () => {

    // JS object user that contains firstname, last,...etc
    const [user, setUser] = useState({
        firstName: "",
        lastName:"",
        email:"",
        password:""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        // spreader that aggregates what is being typed
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        createUser(user)
            .then((result) => {
                console.log("Registration successful:", result.id);
            })
            .catch((error) => {
                console.error("Registration failed:", error.message);
            });
    };
    
    return (
        <div>
            <h1>Notre Dame Football Ticket Register</h1>
            <p>Create an account to continue.</p>

            <AuthForm 
                user={user}
                onChange={handleChange}
                onSubmit={handleSubmit}
                />
        </div>
    );
}

export default Auth;