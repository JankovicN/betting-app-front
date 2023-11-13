import { useEffect } from 'react';
import PropTypes from 'prop-types';


const ErrorAlert = ({ error, removeError }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            removeError();
        }, 3000); // Automatically remove the error message after 3 seconds

        return () => {
            clearTimeout(timer);
        };
    }, [removeError]);

    return <div className="alert alert-danger" role="alert">{error}</div>;
};

ErrorAlert.propTypes = {
    error: PropTypes.string.isRequired,
    removeError: PropTypes.func.isRequired
};
export default ErrorAlert;
