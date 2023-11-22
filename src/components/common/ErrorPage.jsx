import { useNavigate } from "react-router-dom";
import "./ErrorPage.css"

const ErrorPage = () => {
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("/login")
    }
    return (
        <div className="error-page-container">
            <h1 className="error-page-title">404 Not Found</h1>
            <p className="error-page-message">Sorry, the page you are looking for does not exist.</p>
            <button className="error-page-button fw-bold pt-2 pb-2 ps-4 pe-4 rounded_border" onClick={goToLogin}>GO TO LOGIN PAGE</button>
            {/* Add more content or customize based on your needs */}
        </div>
    );
};

export default ErrorPage;
