import PropTypes from 'prop-types';
import Ticket from "./Ticket";

const TicketModal = ({ show, onClose })  => {
    return (
      <div className={`custom-modal ${show ? 'show' : ''}`}>
        <div className="modal-content bg_white mt-5 m-auto">
                <div className='default_padding_px mb-2'>
                    <span className="close_dark" onClick={onClose}>
                        &times;
                    </span>
                </div>
          <Ticket/>
        </div>
      </div>
    );
  }
  
  TicketModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

  export default TicketModal;