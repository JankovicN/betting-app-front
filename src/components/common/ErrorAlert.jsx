import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

const ErrorAlert = ({ message, onClose }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const closeErrorMessage = () => {
        setShow(false);
        onClose();
      };

    return (
        <Alert show={show} variant="danger">
            {message}
            <button type="button" className="close" onClick={closeErrorMessage}>
                <span aria-hidden="true">&times;</span>
            </button>
        </Alert>
    );
};

ErrorAlert.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ErrorAlert;
