import PropTypes from 'prop-types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorAlert from '../common/ErrorAlert';
import UserInformation from '../user/UserInformation';
import ErrorPage from '../common/ErrorPage';
import Header from '../common/Header';
import InfoMessages from '../common/InfoMessage';
import Footer from '../common/Footer';
import './Admin.css';
import UserTickets from '../user/UserTickets';
import CancelTickets from './CancelTickets';

function UserDetail({ setIsAuthenticated }) {
    const { username } = useParams();
    const [errorMessages, setErrorMessages] = useState([]);
    const [infoMessages, setInfoMessages] = useState([]);
    const [isUserInvalid, setInvalidUser] = useState(false);

    // Fetch data for the user with the provided username

    const onError = (data) => {
        console.log("Error data:")
        console.log(data)
        if (data.response !== undefined && JSON.stringify(data.response).includes('The Token has expired')) {
            setIsAuthenticated(false)
        } else if (data.code !== undefined && data.code === 'ERR_NETWORK') {
            addError("Cannot connect to server at this time.\nTry again later");
            setIsAuthenticated(false)
        } else if (data.response !== undefined && data.response.data !== undefined && data.response.data.errorMessages !== undefined) {
            const errorResponse = data.response.data.errorMessages;
            if (errorResponse.includes(`User doesn't exist!`)) {
                setInvalidUser(true)
            }
            addError(errorResponse);
        }
    }

    const addError = (errorMessagesToAdd) => {
        setErrorMessages((prevMessages) => [...prevMessages, ...errorMessagesToAdd]);

        setTimeout(() => {
            clearErrorMessages(errorMessagesToAdd);
        }, 3000)
    }

    const clearErrorMessages = (messagesToClear = []) => {
        setErrorMessages((prevMessages) =>
            prevMessages.filter((message) => !messagesToClear.includes(message))
        );
    };

    const addInfoMessages = (infoMessage) => {
        setInfoMessages((prevMessages) => [...prevMessages, ...infoMessage]);

        setTimeout(() => {
            clearInfoMessages(infoMessage);
        }, 3000)
    }

    const clearInfoMessages = (messagesToClear = []) => {
        setInfoMessages((prevMessages) =>
            prevMessages.filter((message) => !messagesToClear.includes(message))
        );
    };


    return (
        <>
            {isUserInvalid ?
                < div >
                    <ErrorAlert errorMessages={errorMessages} />
                    <ErrorPage />
                </div >
                :
                <div className="container-fluid ">
                    <Header setIsAuthenticated={setIsAuthenticated} admin={true} />

                    <ErrorAlert errorMessages={errorMessages} />
                    <InfoMessages infoMessages={infoMessages} />
                    <div className="min-vh-md-100 container">

                        <div className='pb-4'>
                            <UserInformation username={username} setIsAuthenticated={setIsAuthenticated} onError={onError} addError={addError} addInfoMessages={addInfoMessages} />
                        </div>
                        <div className='rounded_border  p-3'>
                            <div className='text_center fs-3 p-4 fw-bold'>
                                {username} Played tickets
                            </div>
                            <UserTickets username={username} onError={onError} addError={addError} />
                        </div>
                
                        <div className='rounded_border mt-4 p-3'>
                            <div className='text_center fs-3 p-4 fw-bold'>
                                Cancelable Tickets
                            </div>
                            <div className=' pt-3 '>
                                <CancelTickets username={username} addInfoMessages={addInfoMessages} onError={onError} />
                            </div>
                        </div>
                    </div>


                    <Footer setIsAuthenticated={setIsAuthenticated} admin={true} />
                </div>
            }
        </>

    );
}

UserDetail.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired, // Define the 'history' prop
};
export default UserDetail;