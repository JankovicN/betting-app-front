import classes from "./Ticket.module.css";
import PropTypes from 'prop-types';

const TicketBet = ({ bet, action }) => {

    const removeBet = () => {
        action({
            type: 'REMOVE_BET', // Specify the action type
            payload: {
                fixtureIdToRemove: bet.fixtureId,
            },
        });
    }

    return (
        <div className='light_border p-3 relative_position'>
            <span className={`${classes.remove_bet} default_padding_px`} onClick={removeBet}>
                &times;
            </span>
            <div className='fw-bold fs-6'>
                {bet.home.name + ' - ' + bet.away.name}
            </div>
            <div>
                {bet.date}
            </div>
            <div className="row">
                <div className='col-6 text-start fs-6'>
                    {bet.betGroupName}
                </div>
                <div className='col-4 text-end fs-6 '>
                    {bet.oddName}
                </div>
                <div className='col-2 text-end fs-6 fw-bold'>
                    {bet.odd.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

TicketBet.propTypes = {
    bet: PropTypes.object.isRequired,
    action: PropTypes.func.isRequired,
};

export default TicketBet;