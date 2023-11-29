import PropTypes from 'prop-types';
import Leagues from "./Leagues";


const LeaguesModal = ({ show, action, onClose, allLeagues, selectedLeagues, onError }) => {
    return (
        <div className={`custom-modal  ${show ? 'show' : ''}`}>
            <div className="modal-content  m-auto mt-5 h-100">
                <div className='default_padding_px'>
                    <span className="close default_padding_px" onClick={onClose}>
                        &times;
                    </span>
                </div>
                <Leagues action={action}
                    allLeagues={allLeagues}
                    selectedLeagues={selectedLeagues}
                    onError={onError}
                />
            </div>
        </div>
    );
}

LeaguesModal.propTypes = {
    action: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    allLeagues: PropTypes.array,
    selectedLeagues: PropTypes.array.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default LeaguesModal;