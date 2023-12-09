import PropTypes from 'prop-types';

const UserTable = ({ userList, onRowClick }) => {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th className='d-none d-md-table-cell'>Name</th>
                    <th className='d-none d-md-table-cell'>Surname</th>
                    <th>Email</th>
                    <th className='d-none d-md-table-cell'>Balance</th>
                </tr>
            </thead>
            {userList === null || userList === undefined || userList.length < 1
                ?
                <tbody>
                    <tr>
                        <td colSpan="6" className="fs-4 text-center ">
                            No users to show
                        </td>
                    </tr>
                </tbody>
                :
                <tbody className=''>
                    {userList.map((user) => (
                        <tr key={user.id} onClick={() => onRowClick(user.username)}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td className='d-none d-md-table-cell'>{user.name}</td>
                            <td className='d-none d-md-table-cell'>{user.surname}</td>
                            <td>{user.email}</td>
                            <td className='d-none d-md-table-cell'>{user.balance.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            }
        </table>
    );
};


UserTable.propTypes = {
    userList: PropTypes.array,
    onRowClick: PropTypes.func.isRequired
};

export default UserTable;
