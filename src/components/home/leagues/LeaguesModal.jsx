import PropTypes from 'prop-types';
import Leagues from "./Leagues";


const LeaguesModal = ({ show, onClose }) => {
    return (
        <div className={`custom-modal  ${show ? 'show' : ''}`}>
            <div className="modal-content  m-auto mt-5 h-100">
                <div className='default_padding_px'>
                    <span className="close default_padding_px" onClick={onClose}>
                        &times;
                    </span>
                </div>
                <Leagues />
            </div>
        </div>
    );
}

LeaguesModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default LeaguesModal;