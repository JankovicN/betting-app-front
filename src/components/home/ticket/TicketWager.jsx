import { useState } from 'react';
import { useTicketContext } from '../../../context/TicketContext';
import PropTypes from 'prop-types';

const TicketWager = ({ totalOdds, totalWin }) => {
    const [inputValue, setInputValue] = useState(20);
    const { dispatch } = useTicketContext();

    const handleInputChange = (e) => {
        const value = e.target.value;

        // Check if the value is within the specified range
        if (value >= 20 && value <= 100000) {
            setInputValue(value);
            e.target.classList.remove('invalid_input');
            // Dispatch an action to update the context
            dispatch({ type: 'UPDATE_WAGER', payload: parseFloat(value) });
        } else {
            setInputValue(value);
            dispatch({ type: 'UPDATE_INVALID_WAGER' });
            e.target.classList.add('invalid_input');
        }
    };

    function playTicket() {
        console.log("Ticket is played");

        dispatch({
            type: 'PLAY_TICKET', // Specify the action type
            payload: {
            },
        });
    }

    return (
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
                    {totalOdds.toFixed(2)}
                </div>
            </div>
            <div className="row">
                <div className="col-6 text-start ps-3 pt-1 pb-1  m-auto">
                    Total Win:
                </div>
                <div className="col-6 text-end pe-3">
                    {totalWin.toFixed(2)}
                </div>
            </div>
            <button className={`ps-3 pe-3 pt-2 pb-2 fs-4 mb-0 text-start  button `} onClick={() => playTicket()}>PLAY TICKET</button>
        </div>
    );
};
TicketWager.propTypes = {
    totalOdds: PropTypes.number.isRequired,
    totalWin: PropTypes.number.isRequired,
};

export default TicketWager;