import UserTickets from "./UserTickets";

const userData = {
    "id": 3,
    "name": "Nikola",
    "surname": "Jankovic",
    "email": "nj20180199@student.fon.bg.ac.rs",
    "birthday": "1999-06-23",
    "username": "janko",
    "balance": 0.0
}


const User = () => {

    return (
        <>
            <div className="unselectable-text light_border p-3 row m-auto mb-3">
                <div className='text_center fs-3'>
                    User Information
                </div>
                <div className='p-3 row  m-auto mb-md-3'>
                    <div className='col-12 col-md-6 p-md-3 light_border_left'>
                        <div className="ps-md-5 ms-md-5 mb-3">
                            <div className='col-12 col-md-4 fs-6 mb-0'>
                                <label>Username:</label>
                            </div>
                            <div className='col-12 col-md-8'>
                                <input
                                    type="text"
                                    className="form-control fs-6 mt-1"
                                    value={userData.username}
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
                                />
                            </div>
                        </div>
                        <div className="ps-md-5 ms-md-5 mb-3">
                            <div className='col-4  fs-5 mb-0 m-auto'>
                            </div>
                            <div className='col-12 col-md-8'>
                                <button className=' fs-5 pt-1 pb-1 w-100'>Update User Information</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 p-3 light_border'>
                        <div className="m-auto mt-4">
                            <div className='fs-3 mb-3 pb-3 text-center'>
                                User balance: {userData.balance} RSD
                            </div>
                            <div className="pt-3 mb-2 col-12 col-md-8  m-auto">
                                <div className='col-12   fs-6 mb-2'>
                                    <label >Deposit:</label>
                                </div>
                                <div className='col-12 mb-2'>
                                    <input
                                        type="text"
                                        className="form-control  fs-6 mt-1"
                                        placeholder="Deposit amount"
                                    />
                                </div>
                                <div className='col-12'>
                                    <button className=' fs-5 pt-1 pb-1 w-100'>Deposit Amount</button>
                                </div>
                            </div>
                            <div className="pt-3 mb-2 col-12 col-md-8  m-auto">
                                <div className='col-12   fs-6 mb-2'>
                                    <label>Withdraw:</label>
                                </div>
                                <div className='col-12 mb-2'>
                                    <input
                                        type="text"
                                        className="form-control  fs-6 mt-1"
                                        placeholder="Withdraw amount"
                                    />
                                </div>
                                <div className='col-12'>
                                    <button className='fs-5 pt-1 pb-1 w-100'>Withdraw Amount</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UserTickets />
        </>
    );
};

export default User;