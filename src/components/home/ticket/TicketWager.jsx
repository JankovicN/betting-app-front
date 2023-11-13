import { useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import TicketService from '../../../service/TicketService';

const TicketWager = ({ ticketData, action, onError }) => {
    const [inputValue, setInputValue] = useState(20);

    const handleInputChange = (e) => {
        const value = e.target.value;

        // Check if the value is within the specified range
        if (value >= 20 && value <= 100000) {
            setInputValue(value);
            e.target.classList.remove('invalid_input');
            // Dispatch an action to update the context
            action({ type: 'UPDATE_WAGER', payload: { newWager: value } });
        } else {
            setInputValue(value);
            action({ type: 'UPDATE_INVALID_WAGER' });
            e.target.classList.add('invalid_input');
        }
    };

    const onPlayedTicket = () => {
        action({
            type: 'RESET_TICKET', // Specify the action type
            payload: {
            },
        });
    }

    function playTicket() {
        console.log("Wager Amount")
        console.log(inputValue)
        if (inputValue < 20 || inputValue > 100000) {
            onError({ response: { data: { errorMessages: ["Wager must be more than 20 and less than 100,000!"] } } });
        } else if (ticketData.bets == undefined || ticketData.bets.length < 1) {
            onError({ response: { data: { errorMessages: ["Ticket must contain at least one bet!"] } } });
        } else {
            const username = Cookies.get('username');
            if (username) {
                const currentTicketData = ticketData;
                const oddIdArray = currentTicketData.bets.map((bet) => {
                    return { oddId: bet.oddId };
                });
                const currentTicket = {
                    wager: currentTicketData.wager,
                    totalOdd: currentTicketData.totalOdd,
                    totalWin: currentTicketData.totalWin,
                    username: username,
                    bets: oddIdArray,
                };
                TicketService.playTicket(currentTicket, onPlayedTicket, onError);

            } else {
                console.log('User is not logged in!')
            }
        }
    }

    return (
        <div>
            <div className={`light_border `}>
                <div className="row">
                    <div className="col-6 text-start ps-3 pt-1 pb-1 m-auto">
                        Wager:
                    </div>
                    <div className="col-6 text-end pe-3">
                        <input
                            type="number"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="input_field text-end"
                        />
                    </div>
                </div>
                <div className="row ">
                    <div className="col-6 text-start ps-3 pt-1 pb-1  m-auto">
                        Total Odds:
                    </div>
                    <div className="col-6 text-end pe-3">
                        {ticketData.totalOdd.toFixed(2)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 text-start ps-3 pt-1 pb-1  m-auto">
                        Total Win:
                    </div>
                    <div className="col-6 text-end pe-3">
                        {ticketData.totalWin.toFixed(2)}
                    </div>
                </div>
            </div>
            <button className={`rounded_bottom_border ps-3 pe-3 pt-2 pb-2 fs-4 mb-0 text-start  button `} onClick={() => playTicket()}>PLAY TICKET</button>
        </div>
    );
};
TicketWager.propTypes = {
    ticketData: PropTypes.object.isRequired,
    action: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
};

export default TicketWager;