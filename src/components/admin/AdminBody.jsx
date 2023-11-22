
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService';
import TicketService from '../../service/TicketService';
import FixtureService from '../../service/FootballApiService';
import ErrorAlert from '../common/ErrorAlert';
import InfoMessages from '../common/InfoMessage';
import UserTable from '../table/user/UserTable';
import UserTickets from '../user/UserTickets';
import CancelTickets from './CancelTickets';



const AdminBody = ({ setIsAuthenticated }) => {

    const firstPage = 0;
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [infoMessages, setInfoMessages] = useState([]);
    const [userFilterField, setUserFilterField] = useState('');

    useEffect(() => {
        UserService.getAllUsers(firstPage, onSuccessAllUsers, onError);
    }, [])

    const showUserInformation = (username) => {
        console.log("showing info about user")
        console.log(username)
        navigate(`/user/${username}`);
    }

    const fetchNewFixturesApiCall = () => {
        FixtureService.getNewFixtures(onSuccessFetchNewFixtures, onError);
    }

    const updateTicketsApiCall = () => {
        TicketService.updateTickets(onSuccessApiCall, onError);
    }

    const filterUsersApiCall = () => {
        UserService.getFilteredUsers(userFilterField, firstPage, onSuccessAllUsers, onError);
    }

    const onSuccessFetchNewFixtures = (data) => {
        console.log(data)
        addInfoMessages(data.infoMessages);
    }

    const onSuccessAllUsers = (data) => {
        console.log(data)
        if (data !== undefined && data !== null && data.content !== undefined && data.content !== null) {
            setUsers(data.content)
        }
    }

    const onSuccessApiCall = (data) => {
        console.log(data)
        addInfoMessages(data.infoMessages);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'userFilterField') {
            setUserFilterField(value);
        } else {
            console.log(`Filed name not found name = ${name} value = ${value}`)
        }
    }

    const onError = (data) => {
        console.log("Error data:")
        console.log(data)
        if (data.response !== undefined && JSON.stringify(data.response).includes('The Token has expired')) {
            setIsAuthenticated(false)
        } else if (data.code !== undefined && data.code === 'ERR_NETWORK') {
            addError("Cannot connect to server at this time.\nTry again later");
            setIsAuthenticated(false)
        } else if (data.response !== undefined && data.response.data !== undefined && data.response.data.errorMessages !== undefined) {
            addError(data.response.data.errorMessages);
        }

    }

    const addError = (errorMessages) => {
        setErrorMessages((prevMessages) => [...prevMessages, ...errorMessages]);

        setTimeout(() => {
            clearErrorMessages(errorMessages);
        }, 3000)
    }

    const clearErrorMessages = (messagesToClear = []) => {
        setErrorMessages((prevMessages) =>
            prevMessages.filter((message) => !messagesToClear.includes(message))
        );
    }

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
    }

    return (
        <div className="container-fluid container  dashboard_body">
            <ErrorAlert errorMessages={errorMessages} />
            <InfoMessages infoMessages={infoMessages} />

            <div className="col-12 mb-4 mt-4  pt-3 ">
                <div className='fs-2  pb-2 text-center'>Admin Dashboard</div>
                <div className="row">
                    <div className="col-6" >
                        <button className="w-100 fs-5 p-2 blue_button" onClick={fetchNewFixturesApiCall}>FETCH FIXTURES</button>
                    </div>
                    <div className="col-6" >
                        <button className="w-100 fs-5 p-2 blue_button" onClick={updateTicketsApiCall}>UPDATE TICKETS</button>
                    </div>
                </div>
            </div>

            <div className='rounded_border p-3 pt-md-4 pb-md-5 ps-md-5 pe-md-5 '>
                <div className='fs-2 p-1 text-center'>User Information</div>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='col-6 col-md-4 m-3'>
                        <input
                            type="text"
                            className="form-control fs-6 h-100"
                            placeholder="Filter by username"
                            value = {userFilterField}
                            name="userFilterField"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='col-4'>
                        <button className=" h-100 w-100 p-1 blue_button" onClick={filterUsersApiCall}>FILTER</button>
                    </div>
                </div>
                <div>
                    <UserTable userList={users} onRowClick={showUserInformation} />
                </div>
            </div>

            <div className='rounded_border mt-5 p-3 p-md-5'>
                <div className='fs-2 p-3 text-center'>Cancelable Tickets</div>
                <div className=' pt-3 '>
                    <CancelTickets addInfoMessages={addInfoMessages} onError={onError} />
                </div>
            </div>

            <div className='rounded_border mt-5 p-3 p-md-5'>
                <div className='fs-2 text-center'>All Tickets</div>
                <div  className=' pt-3 '>
                    <UserTickets onError={onError} />
                </div>
            </div>

        </div>
    );
};

AdminBody.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired, // Define the 'history' prop
};
export default AdminBody;