import PropTypes from 'prop-types';
import './Ticket.css';

const TicketTable = ({ ticketList, onRowClick }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th className='text-center'>Date</th>
          <th className='text-center'>Wager</th>
          <th className='text-center d-none d-md-table-cell'>Odds</th>
          <th className='text-center'>Win</th>
          <th className='text-center'>State</th>
        </tr>
      </thead>
      {ticketList === null || ticketList === undefined || ticketList.length < 1
        ?
        <tbody>
          <tr>
            <td colSpan="5" className="fs-4 text-center ">
              No tickets to show
            </td>
          </tr>
        </tbody>
        :
        <tbody className=''>
          {ticketList.map((ticket) => (
            <tr key={ticket.id} className={`state-${ticket.state}`} onClick={() => onRowClick(ticket)}>
              <td className='text-center'>{ticket.dateOfPlay.split(' ')[0]}</td>
              <td className='text-center'>{ticket.wager}</td>
              <td className='text-center d-none d-md-table-cell'>{ticket.totalOdd}</td>
              <td className='text-center'>{ticket.totalWin}</td>
              <td className='text-center'>{ticket.state}</td>
            </tr>
          ))}
        </tbody>
      }
    </table>
  );
};


TicketTable.propTypes = {
  ticketList: PropTypes.array,
  onRowClick: PropTypes.func.isRequired
};

export default TicketTable;
