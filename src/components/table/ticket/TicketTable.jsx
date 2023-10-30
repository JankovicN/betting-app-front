import PropTypes from 'prop-types';

const TicketTable = ({ ticketList, onRowClick }) => {
  return (
    <table className="table table-hover ">
      <thead>
        <tr>
          <th>Date of Play</th>
          <th>Wager</th>
          <th>Total Odds</th>
          <th>Win</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
        {ticketList.map((ticket) => (
          <tr key={ticket.id} onClick={() => onRowClick(ticket)}>
            <td>{ticket.dateOfPlay}</td>
            <td>{ticket.wager}</td>
            <td>{ticket.totalOdd}</td>
            <td>{ticket.totalWin}</td>
            <td>{ticket.state}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


TicketTable.propTypes = {
    ticketList: PropTypes.object.isRequired,
    onRowClick:PropTypes.func.isRequired
};

export default TicketTable;
