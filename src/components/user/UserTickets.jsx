import { useEffect, useState } from 'react';
import TicketTable from '../table/ticket/TicketTable';
import TicketDetails from '../table/ticket/TicketDetails';
import Cookies from 'js-cookie';
import TicketService from '../../service/TicketService';
import AuthService from '../../service/AuthService';
import PropTypes from 'prop-types';
import BetService from '../../service/BetService';

const ticketList = [
    {
        "id": 3,
        "wager": 100.0,
        "totalOdd": 23.0,
        "totalWin": 2300.0,
        "dateOfPlay": "2023-10-23 19:23:25",
        "state": "WIN"
    },
    {
        "id": 4,
        "wager": 1000.0,
        "totalOdd": 15.0,
        "totalWin": 1500.0,
        "dateOfPlay": "2023-5-11 13:23:25",
        "state": "LOSS"
    },
    {
        "id": 5,
        "wager": 500.0,
        "totalOdd": 10.0,
        "totalWin": 5000.0,
        "dateOfPlay": "2023-10-15 07:23:25",
        "state": "-"
    }
]

const bets = [
    {
        "id": 1,
        "state": "WIN",
        "odd": 2.0,
        "name": "Home",
        "betGroupName": "Match Winner",
        "fixtureDate": "2023-10-15 10:00:00",
        "home": "Liverpool",
        "away": "Chelsea",
        "result": "2:0",
    },
    {
        "id": 2,
        "state": "WIN",
        "odd": 3.0,
        "name": "Away",
        "betGroupName": "Match Winner",
        "fixtureDate": "2023-10-15 12:00:00",
        "home": "West Ham",
        "away": "Arsenal",
        "result": "0:3",
    },
    {
        "id": 3,
        "state": "WIN",
        "odd": 1.5,
        "name": "Draw",
        "betGroupName": "Match Winner",
        "fixtureDate": "2023-10-15 12:00:00",
        "home": "Fulham",
        "away": "Burnley",
        "result": "2:2",
    }
]

const UserTickets = ({ onError, setError }) => {
    const [ticketList, setTicketList] = useState(null)
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [bets, setTicketBets] = useState(null);

    useEffect(() => {
        const username = Cookies.get('username');
        if (username) {
            TicketService.getUserTickets(username, onSuccessTicketList, onError);
        } else {
            setError("Username is missing!")
        }
    }, [])

    const onSuccessTicketList = (data) => {
        console.log('onSuccessTicketList')
        console.log(data)
        if (data !== undefined && data !== null && data.length > 0) {
            setTicketList(data)
        }
    }

    const onSuccessBetsCall = (data) => {
        setTicketBets(data);
    }

    const handleRowClick = (ticket) => {
        setSelectedTicket(ticket);
        const ticketID = ticket.id;
        BetService.getBetsForTicket(ticketID, onSuccessBetsCall, onError);
    };

    const closeModal = () => {
        setSelectedTicket(null);
        setTicketBets(null);
    };

    return (
        <div className="light_border p-3  ms-3 me-3  unselectable-text">
            <div className='text_center fs-3'>
                User Tickets
            </div>
            <TicketTable ticketList={ticketList} onRowClick={handleRowClick} />

            {selectedTicket && bets && (
                <TicketDetails ticket={selectedTicket} bets ={bets} onClose={closeModal} />
            )}
        </div>
    );
}

UserTickets.propTypes = {
    onError: PropTypes.func.isRequired, // Define the 'history' prop
    setError: PropTypes.func.isRequired,
};

export default UserTickets;