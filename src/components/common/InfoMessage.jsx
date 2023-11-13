import { useEffect } from 'react';
import PropTypes from 'prop-types';


const InfoMessage = ({ message, removeInfoMessage }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            removeInfoMessage();
        }, 3000); // Automatically remove the error message after 3 seconds

        return () => {
            clearTimeout(timer);
        };
    }, [removeInfoMessage]);

    return <div className="alert alert-info" role="alert">{message}</div>;
};

InfoMessage.propTypes = {
    message: PropTypes.string.isRequired,
    removeInfoMessage: PropTypes.func.isRequired
};
export default InfoMessage;
