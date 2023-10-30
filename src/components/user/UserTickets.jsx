import { useState } from 'react';
import TicketTable from '../table/ticket/TicketTable';
import TicketDetails from '../table/ticket/TicketDetails';

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

const UserTickets = () => {
    const [selectedTicket, setSelectedTicket] = useState(null);

    const handleRowClick = (ticket) => {
        ticket.bets = bets;
        setSelectedTicket(ticket);
    };

    const closeModal = () => {
        setSelectedTicket(null);
    };

    return (
        <div className="light_border p-3 ">
            <div className='text_center fs-3'>
                User Tickets
            </div>
            <TicketTable ticketList={ticketList} onRowClick={handleRowClick} />

            {selectedTicket && (
                <TicketDetails ticket={selectedTicket} onClose={closeModal} />
            )}
        </div>
    );
}

export default UserTickets;