import PropTypes from 'prop-types';

const ErrorAlert = ({ errorMessages }) => {

    return <div className="error-container">
        {errorMessages !== undefined && errorMessages.length !== 0
            ? errorMessages.map((error, index) => (

                <div key={index} className="alert alert-danger" role="alert">{error}</div>
            )
            ) : <></>
        }
    </div>

};

ErrorAlert.propTypes = {
    errorMessages: PropTypes.array,
};
export default ErrorAlert;
