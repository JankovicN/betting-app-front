import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import ticketDataReducer from '../reducer/TicketReducer';

const initialData = {
    wager: 20,
    totalOdd: 1,
    totalWin: 0,
    bets: [
    ],
};

const TicketContext = createContext(initialData);

const TicketProvider = ({ children }) => {
    const [ticketData, dispatch] = useReducer(ticketDataReducer, initialData);

    return (
        <TicketContext.Provider value={{ ticketData, dispatch }}>
            {children}
        </TicketContext.Provider>
    );
};

const useTicketContext = () => {
    return useContext(TicketContext);
}

TicketProvider.propTypes = {
    children: PropTypes.node // Add this line for prop validation
};

export { TicketProvider, useTicketContext };
