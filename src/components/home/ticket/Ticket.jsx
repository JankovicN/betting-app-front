import Line from "../../common/Line";
import classes from "./Ticket.module.css";
import TicketBet from "./TicketBet";
import TicketWager from "./TicketWager";
import PropTypes from 'prop-types';

const Ticket = ({ticketData, action}) => {



    return (
        <div className={`light_border  resizableDiv`}>
            <div className="title default_padding_px ps-3 pe-3  pt-2 pb-2 fs-3">
                Ticket
            </div>
            <div className=" d-none d-md-block">
                <Line />
            </div>
            <div className={`${classes.all_bets_container}`}>
                {ticketData.bets.map(b => {
                    return (
                        <TicketBet key={b.fixtureId + ' ' + b.odd} bet={b} action={action}/>
                    )
                })}
            </div>
            <TicketWager totalOdds={ticketData.totalOdd} totalWin={ticketData.totalWin} action={action}/>

        </div>
    );
};

Ticket.propTypes = {
    action: PropTypes.func.isRequired,
    ticketData: PropTypes.object.isRequired
};

export default Ticket;