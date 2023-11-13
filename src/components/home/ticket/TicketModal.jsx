import PropTypes from 'prop-types';
import Ticket from "./Ticket";

const TicketModal = ({ show, onClose, ticketData, action, onError }) => {
  return (
    <div className={` custom-modal ${show ? 'show' : ''}`}>
      <div className="modal-content  mt-5 m-auto rounded_border p-0">
        <div className=''>
          <span className="close_dark" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className='bg_white'>
          <Ticket action={action} ticketData={ticketData} onError={onError} /></div>
      </div>
    </div>
  );
}

TicketModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ticketData: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default TicketModal;