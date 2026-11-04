// Parent authentication component
import { useNavigate } from "react-router-dom";

// Auth component serves as the landing page for the application, providing navigation to the registration and login forms.
const Auth = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Notre Dame Football Tickets</h1>
            <button type="button" onClick={() => navigate("/register")}>
                Register
            </button>
            <button type="button" onClick={() => navigate("/login")}>
                Login
            </button>
        </div>
    );
};

export default Auth;

// Future work: Consider adding a "Forgot Password" link to enhance user experience and account recovery options.
// Future work: make it more as a landing page with a brief description of the application and its features, along with links to register or login.
// Future work: make it more visually appealing with images or graphics related to Notre Dame football, and possibly a call-to-action button for registration or login.