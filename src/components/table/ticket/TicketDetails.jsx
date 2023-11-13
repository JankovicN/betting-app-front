import PropTypes from 'prop-types';
import BetsTable from './BetsTable';
import "./Ticket.css"

const TicketDetails = ({ ticket, bets, onClose }) => {
    return (
        <div className="modal ticket_details" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="custom_modal ">
                <div className={`modal-content   align-items-center`}>
                    <div className={`row state-${ticket.state} modal_header rounded p-2 fw-4`}>
                        <div className="col-5 text-start p-2 m-auto fs-6">
                            {ticket.dateOfPlay}
                        </div>
                        <div className="col-5  p-2 m-auto text-end fs-6 ">
                            {ticket.state === '-' ? 'WAITING FOR RESULTS' : ticket.state}
                        </div>
                        <div className="col-1 text-end p-0">
                            <button type="button" className={`modal_close state-${ticket.state} m-auto`} data-dismiss="modal" onClick={onClose}>
                                <span>&times;</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body container_width">
                        <BetsTable bets={bets} />
                        <div className={`row state-${ticket.state}  rounded  ms-1 me-1 mt-5`}>
                            <div className='col-4 text-center column_name fw-bold '>Wager<br />{ticket.wager}</div>
                            <div className='col-4 text-center column_name fw-bold '>Odds<br />{ticket.totalOdd}</div>
                            <div className='col-4 text-center column_name fw-bold  '>Win<br />{ticket.totalWin}</div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
}


TicketDetails.propTypes = {
    ticket: PropTypes.object.isRequired,
    bets: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired
};

export default TicketDetails;