import PropTypes from 'prop-types';
import './Ticket.css';
import TicketService from '../../../service/TicketService';

const CancelableTicketsTable = ({ ticketList, onError, onSuccessApiCall }) => {

    const onButtonCancel = (ticket) => {
        console.log(ticket)
        TicketService.cancelTicket(ticket, onSuccessApiCall, onError)
    }

    return (
        <table className="table table-hover ">
            <thead>
                <tr>
                    <th className='text-center'>ID</th>
                    <th className='text-center d-none d-md-table-cell'>User ID</th>
                    <th className='text-center'>Username</th>
                    <th className='text-center d-none d-md-table-cell'>Date</th>
                    <th className='text-center'>Cancel</th>
                </tr>
            </thead>
            {ticketList === null || ticketList === undefined || ticketList.length < 1
                ?
                <tbody>
                    <tr>
                        <td colSpan="5" className="fs-5 p-2 text-center ">
                            No tickets to show
                        </td>
                    </tr>
                </tbody>
                :
                <tbody className=''>
                    {ticketList.map((ticket) => (
                        <tr key={ticket.id}>
                            <td className='text-center'>{ticket.id}</td>
                            <td className='text-center'>{ticket.userId}</td>
                            <td className='text-center'>{ticket.username}</td>
                            <td className='text-center'>{ticket.dateOfPlay}</td>
                            <td className='text-center'><button className='blue_button w-100 h-100' onClick={() => onButtonCancel(ticket)}>Cancel</button></td>
                        </tr>
                    ))}
                </tbody>
            }
        </table>
    );
};


CancelableTicketsTable.propTypes = {
    ticketList: PropTypes.array,
    onSuccessApiCall: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
};

export default CancelableTicketsTable;
