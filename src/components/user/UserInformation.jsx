import React, { useEffect, useState } from "react";
import UserService from "../../service/UserService";
import PropTypes from 'prop-types';
import PaymentService from "../../service/PaymentService";



const UserInformation = ({ username, setIsAuthenticated, onError, addError, addInfoMessages }) => {

    const [userData, setUserData] = useState(null);
    const depositInputRef = React.createRef();
    const withdrawInputRef = React.createRef();

    useEffect(() => {
        if (username) {
            UserService.getUserInformation(username, onSuccessUserData, onError);
        } else {
            setIsAuthenticated(false)
            addError(["Username is missing!"])
        }
    }, [])

    const updateUser = () => {
        const currentUserData = userData;
        UserService.updateUser(username, currentUserData, onSuccessUpdate, onError);
    }

    const attemptDeposit = () => {
        const depositAmount = depositInputRef.current.value;
        if (depositAmount === undefined || depositAmount === null || depositAmount < 0) {
            addError(["Invalid deposit amount!"]);
        } else if (depositAmount < 500) {
            addError(["Deposit Amount must be above 500!"]);
        } else {
            PaymentService.depositAmount(userData.id, depositAmount, onSuccessfullTranasction, onError)
        }
        depositInputRef.current.value = '';
    }

    const attemptWithdraw = () => {
        const withdrawAmount = withdrawInputRef.current.value;
        if (withdrawAmount === undefined || withdrawAmount === null || withdrawAmount < 0) {
            addError(["Invalid withdraw amount!"]);
        } else {
            PaymentService.withdrawAmount(userData.id, withdrawAmount, onSuccessfullTranasction, onError)
        }
        withdrawInputRef.current.value = '';
    }

    const onSuccessUserData = (data) => {
        if (data !== undefined && data !== null) {
            setUserData(data);
        } else {
            onError(data)
        }
    }

    const onSuccessfullTranasction = (data) => {
        console.log("Transaction successfull")
        console.log(data)
        console.log(data)
        if (data !== undefined && data !== null && data.length > 0) {
            const infoMessage = data;
            addInfoMessages(infoMessage)
        }
        PaymentService.getUserBalance(userData.id, onSuccessBalanceRequest, onError)
    }

    const onSuccessBalanceRequest = (data) => {
        if (data !== undefined && data !== null) {
            const updatedUserData = { ...userData, balance: data };
            setUserData(updatedUserData);
        }
    }

    const onSuccessUpdate = (data) => {
        console.log("Successfully updated user")
        console.log(data)
        if (data !== undefined && data !== null) {
            setUserData(data.data)
            addInfoMessages(data.infoMessages);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    return (
        <>
            {userData !== null ?
                <div className="unselectable-text rounded_border p-3 row m-auto mb-3">
                    <div className='text_center fs-3 p-3 fw-bold'>
                        User {userData.username} Information
                    </div>
                    <div className='p-3 row  m-auto mb-md-3'>
                        <div className='col-12 col-md-6 p-md-3 '>
                            <div className="ps-md-5 ms-md-5 mb-3">
                                <div className='col-12 col-md-4 fs-6 mb-0'>
                                    <label>Username:</label>
                                </div>
                                <div className='col-12 col-md-8'>
                                    <input
                                        type="text"
                                        className="form-control fs-6 mt-1"
                                        value={userData.username}
                                        name="username"
                                        disabled={true}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="ps-md-5 ms-md-5 mb-3">
                                <div className='col-4  fs-6 mb-0'>
                                    <label>Email address:</label>
                                </div>
                                <div className='col-12 col-md-8'>
                                    <input
                                        type="email"
                                        className="form-control fs-6 mt-1"
                                        value={userData.email}
                                        name="email"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="ps-md-5 ms-md-5 mb-3">
                                <div className='col-4  fs-6  mb-0'>
                                    <label>Birthday:</label>
                                </div>
                                <div className='col-12 col-md-8'>
                                    <input
                                        type="date"
                                        className="form-control fs-6 mt-1"
                                        value={userData.birthday}
                                        name="birthday"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="ps-md-5 ms-md-5 mb-3">
                                <div className='col-4  fs-6 mb-0'>
                                    <label>Name:</label>
                                </div>
                                <div className='col-12 col-md-8'>
                                    <input
                                        type="text"
                                        className="form-control  fs-6 mt-1"
                                        value={userData.name}
                                        name="name"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="ps-md-5 ms-md-5 mb-3">
                                <div className='col-4   fs-6 mb-0 '>
                                    <label>Surname:</label>
                                </div>
                                <div className='col-12 col-md-8'>
                                    <input
                                        type="text"
                                        className="form-control  fs-6 mt-1"
                                        value={userData.surname}
                                        name="surname"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="ps-md-5 ms-md-5 mb-3">
                                <div className='col-4  fs-5 mb-0 m-auto'>
                                </div>
                                <div className='col-12 col-md-8'>
                                    <button className=' fs-5 pt-1 pb-1 w-100 blue_button' onClick={updateUser}>Update User Information</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 p-3 rounded_border shadow user_balance_container'>
                            <div className="m-auto mt-4">
                                <div className='fs-3 mb-3 pb-3 text-center'>
                                    User balance: {userData.balance} RSD
                                </div>
                                <div className="pt-3 mb-2 col-12 col-md-8  m-auto">
                                    <div className='col-12  fs-5 mb-2'>
                                        <label >Deposit:</label>
                                    </div>
                                    <div className='col-12 mb-2'>
                                        <input
                                            ref={depositInputRef}
                                            type="number"
                                            className="form-control  fs-6 mt-1"
                                            placeholder="Deposit amount"
                                        />
                                    </div>
                                    <div className='col-12'>
                                        <button className=' fs-5 pt-1 pb-1 w-100 blue_button' onClick={attemptDeposit}>Deposit Amount</button>
                                    </div>
                                </div>
                                <div className="pt-3 mb-2 col-12 col-md-8  m-auto">
                                    <div className='col-12 fs-5 mb-2'>
                                        <label>Withdraw:</label>
                                    </div>
                                    <div className='col-12 mb-2'>
                                        <input
                                            ref={withdrawInputRef}
                                            type="number"
                                            className="form-control  fs-6 mt-1"
                                            placeholder="Withdraw amount"
                                        />
                                    </div>
                                    <div className='col-12'>
                                        <button className='fs-5 pt-1 pb-1 w-100 blue_button' onClick={attemptWithdraw}>Withdraw Amount</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <></>}
        </>
    );
};

UserInformation.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    addError: PropTypes.func.isRequired,
    addInfoMessages: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
};

export default UserInformation;