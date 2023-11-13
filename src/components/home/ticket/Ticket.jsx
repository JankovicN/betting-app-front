import classes from "./Ticket.module.css";
import TicketBet from "./TicketBet";
import TicketWager from "./TicketWager";
import PropTypes from 'prop-types';

const Ticket = ({ ticketData, action, onError }) => {

    const removeAllBets = () => {
        action({
            type: 'RESET_TICKET', // Specify the action type
            payload: {
            },
        });
    }

    return (
        <div className={`rounded_border resizableDiv`}>
            <div className="title rounded_top_border default_padding_px ps-3 pe-3  pt-2 pb-2 fs-3">
                Ticket
            </div>

            <button className={`p-1 fs-5 m-auto text-center  ${classes.remove_bets_button} `} onClick={() => removeAllBets()}>REMOVE ALL BETS</button>
            <div className={`${classes.all_bets_container}`}>
                {ticketData.bets.map(b => {
                    return (
                        <TicketBet key={b.fixtureId + ' ' + b.odd} bet={b} action={action} />
                    )
                })}
            </div>
            <TicketWager ticketData={ticketData} action={action} onError={onError} />

        </div>
    );
};

Ticket.propTypes = {
    action: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    ticketData: PropTypes.object.isRequired
};

export default Ticket;