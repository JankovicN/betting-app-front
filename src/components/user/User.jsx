import { useState } from "react";
import UserTickets from "./UserTickets";
import PropTypes from 'prop-types';
import ErrorAlert from '../common/ErrorAlert';
import UserInformation from "./UserInformation";
import Cookies from "js-cookie";
import InfoMessages from "../common/InfoMessage";



const User = ({ setIsAuthenticated }) => {

    const [errorMessages, setErrorMessages] = useState([]);
    const [infoMessages, setInfoMessages] = useState([]);
    const username = Cookies.get('username')

    const onError = (data) => {
        console.log("Error data:")
        console.log(data)
        if (data.response !== undefined && JSON.stringify(data.response).includes('The Token has expired')) {
            setIsAuthenticated(false)
        } else if (data.code !== undefined && data.code === 'ERR_NETWORK') {
            setIsAuthenticated(false)
        } else if (data.response !== undefined && data.response.data !== undefined && data.response.data.errorMessages !== undefined) {
            if (!JSON.stringify(data.response).includes('Insufficient funds')) {
                setIsAuthenticated(false)
            }

            const errors = data.response.data.errorMessages;
            addError(errors);
            setTimeout(() => {
                clearErrorMessages(errors);
            }, 3000)
        }
    }


    const addError = (errorMessages) => {
        setErrorMessages((prevMessages) =>
            [...prevMessages, ...errorMessages]);

        setTimeout(() => {
            clearErrorMessages(errorMessages);
        }, 3000)
    }

    const clearErrorMessages = (messagesToClear = []) => {
        setErrorMessages((prevMessages) =>
            prevMessages.filter((message) => !messagesToClear.includes(message))
        );
    };

    const addInfoMessages = (infoMessageToAdd) => {
        setInfoMessages((prevMessages) => [...prevMessages, ...infoMessageToAdd]);

        setTimeout(() => {
            clearInfoMessages(infoMessageToAdd);
        }, 3000);
    };

    const clearInfoMessages = (messagesToClear = []) => {
        setInfoMessages((prevMessages) =>
            prevMessages.filter((message) => !messagesToClear.includes(message))
        );
    };

    return (
        <>
            <ErrorAlert errorMessages={errorMessages} />
            <InfoMessages infoMessages={infoMessages} />
            <div className="min-vh-100 container">
                <div className=" ms-3 me-3  unselectable-text">
                    <UserInformation  setIsAuthenticated={setIsAuthenticated} username={username} onError={onError} addError={addError} addInfoMessages={addInfoMessages} />
                </div>

                <div className="rounded_border p-3  ms-3 me-3  unselectable-text">
                    <div className='text_center fs-3'>
                        User Tickets
                    </div>
                    <UserTickets username={username} onError={onError} addError={addError} />
                </div>
            </div>
        </>
    );
};

User.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired, // Define the 'history' prop
};

export default User;