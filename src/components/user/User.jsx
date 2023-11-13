import { useState } from "react";
import UserTickets from "./UserTickets";
import PropTypes from 'prop-types';
import ErrorAlert from '../common/ErrorAlert';
import InfoMessage from "../common/InfoMessage";
import UserInformation from "./UserInformation";
import Cookies from "js-cookie";



const User = ({ setIsAuthenticated }) => {

    const [error, setError] = useState(null);
    const [infoMessage, setInfoMessage] = useState(null);
    const username = Cookies.get('username')

    const onError = (data) => {
        console.log("Error data:")
        console.log(data)
        if (data.response !== undefined && JSON.stringify(data.response).includes('The Token has expired')) {
            setIsAuthenticated(false)
        } else if (data.code !== undefined && data.code === 'ERR_NETWORK') {
            setIsAuthenticated(false)
        } else if (data.response !== undefined && data.response.data !== undefined && data.response.data.errorMessages !== undefined) {
            setIsAuthenticated(false)
            setError(data.response.data.errorMessages[0]);
        }
    }

    const removeError = () => {
        setError(null);
    }

    const removeInfo = () => {
        setInfoMessage(null);
    }


    return (
        <>
            <div className="error-container">
                {error !== undefined && error !== null
                    ?
                    <ErrorAlert error={error} removeError={() => removeError()} />
                    : <></>
                }
            </div>
            <div className="info-container">
                {infoMessage !== undefined && infoMessage !== null
                    ?
                    <InfoMessage message={infoMessage} removeInfoMessage={() => removeInfo()} />
                    : <></>
                }
            </div>
            <UserInformation username = {username} onError={onError} setError={setError} setInfoMessage={setInfoMessage} />
            <UserTickets onError={onError} setError={setError} />
        </>
    );
};

User.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired, // Define the 'history' prop
};

export default User;