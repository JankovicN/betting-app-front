import PropTypes from 'prop-types';
import BetsTable from './BetsTable';

const TicketDetails = ({ ticket, onClose }) => {


    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="custom_modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Date of Play: {ticket.dateOfPlay}</h5>
                        <button type="button" className="close" data-dismiss="modal" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <BetsTable bets={ticket.bets} />
                        <div className="ticket-details">
                            <div className="p-3">
                                <h3>Wager: {ticket.wager}</h3>
                                <h3>Total Odds: {ticket.totalOdd}</h3>
                                <h3>Win: {ticket.totalWin}</h3>
                            </div>
                            <div className="ticket-details-section h-100">
                                <h3 className="state-highlight">{ticket.state}</h3>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}


TicketDetails.propTypes = {
    ticket: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export default TicketDetails;