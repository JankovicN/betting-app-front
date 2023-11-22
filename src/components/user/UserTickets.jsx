import { useEffect, useState } from 'react';
import TicketTable from '../table/ticket/TicketTable';
import TicketDetails from '../table/ticket/TicketDetails';
import PropTypes from 'prop-types';
import BetService from '../../service/BetService';
import TicketService from '../../service/TicketService';
import PageNumbering from '../common/PageNumbering';


const UserTickets = ({ username, onError }) => {
    const [ticketList, setTicketList] = useState(undefined);
    const [selectedTicket, setSelectedTicket] = useState(undefined);
    const [bets, setTicketBets] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(undefined);
    const [totalPages, setTotalPages] = useState(undefined);


    useEffect(() => {
        const firstPage = 0;
        fetchNewPage(firstPage);
    }, [])

    const onSuccessTicketList = (data) => {
        console.log('onSuccessTicketList')
        console.log(data)
        if (data !== undefined && data !== null && data.content !== null && data.content !== undefined) {
            setTicketList(data.content)
            if (data.totalPages > 1) {
                setCurrentPage(data.number)
                setTotalPages(data.totalPages)
                console.log("Setting page numbers")
                console.log(currentPage)
                console.log(totalPages)
            }
        }
    }

    const fetchNewPage = (page) => {
        console.log(page)
        if (username) {
            TicketService.getUserTickets(username, page, onSuccessTicketList, onError);
        } else {
            TicketService.getAllTickets(page, onSuccessTicketList, onError);
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
        <div className=" container">
            <TicketTable username={username} ticketList={ticketList} onRowClick={handleRowClick} />
            {typeof totalPages === 'number' && typeof currentPage === 'number' ? (
                <div className="pagination p-4">
                    <PageNumbering maxValue={totalPages} currentPage={currentPage} handlePageClick={fetchNewPage} />
                </div>
            ) : <></>}

            {selectedTicket && bets && (
                <TicketDetails ticket={selectedTicket} bets={bets} onClose={closeModal} />
            )}
        </div>
    );
}

UserTickets.propTypes = {
    onError: PropTypes.func.isRequired,
    username: PropTypes.string,
};

export default UserTickets;