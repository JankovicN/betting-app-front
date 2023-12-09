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
    const [dateFilterField, setDateFilterField] = useState("");


    useEffect(() => {
        console.log("rendering")
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

    const filterTickets = () => {
        fetchNewPage(0);
    }

    const fetchNewPage = (page) => {
        console.log("filter")
        console.log(dateFilterField)
        const params = {
            page: page,
            ...(dateFilterField && dateFilterField.length!==0 && { date: dateFilterField }),
            ...(username && { username: username })
        };
        const apiCall = username ? TicketService.getUserTickets : TicketService.getAllTickets;

        apiCall(params, onSuccessTicketList, onError);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dateFilterField') {
            setDateFilterField(value);
        } else {
            console.log(`Filed name not found name = ${name} value = ${value}`)
        }
    }

    return (
        <div className=" container">
            <div className='d-flex justify-content-center align-items-center'>
                <div className='col-6 col-md-4 m-3'>
                    <input
                        type="date"
                        className="form-control fs-6 h-100"
                        placeholder="Filter by username"
                        value={dateFilterField}
                        name="dateFilterField"
                        onChange={handleInputChange}
                    />
                </div>
                <div className='col-4'>
                    <button className=" h-100 w-100 p-1 blue_button" onClick={filterTickets}>FILTER</button>
                </div>
            </div>
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