import PropTypes from 'prop-types';
import Ticket from "./Ticket";

const TicketModal = ({ show, onClose, ticketData, action, onError }) => {
  return (
    <div className={`custom-modal ${show ? 'show' : ''}`}>
      <div className="modal-content bg_white mt-5 m-auto">
        <div className='default_padding_px mb-2'>
          <span className="close_dark" onClick={onClose}>
            &times;
          </span>
        </div>
        <Ticket action={action} ticketData={ticketData} onError={onError} />
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