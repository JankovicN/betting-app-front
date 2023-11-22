import PropTypes from 'prop-types';

const InfoMessages = ({ infoMessages }) => {
    return (
        <div className="error-container">
            {infoMessages !== undefined && infoMessages.length !== 0
                ?
                infoMessages.map((infoMessage, index) => (
                    <div key={index} className="alert alert-info" role="alert">
                        {infoMessage}
                    </div>
                ))
                : <></>
            }
        </div>
    )

};

InfoMessages.propTypes = {
    infoMessages: PropTypes.array.isRequired,
};
export default InfoMessages;
