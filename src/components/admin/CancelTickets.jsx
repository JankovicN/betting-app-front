import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TicketService from '../../service/TicketService';
import PageNumbering from '../common/PageNumbering';
import CancelableTicketsTable from '../table/ticket/CancelableTicketsTable';


const CancelTickets = ({ addInfoMessages, onError, username }) => {
    const firstPage = 0;
    const [ticketList, setCancelTicketList] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(undefined);
    const [totalPages, setTotalPages] = useState(undefined);


    useEffect(() => {
        fetchNewPage(firstPage);
    }, [username])

    const onSuccessApiCall = (data) => {
        if (data.infoMessages !== undefined) {
            addInfoMessages(data.infoMessages)
        }
        fetchNewPage(firstPage);
    }

    const onSuccessCancelTicketCall = (data) => {
        console.log('onSuccessCancelTicketCall')
        console.log(data)
        if (data !== undefined && data !== null && data.content !== null && data.content !== undefined) {
            setCancelTicketList(data.content)
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
        const params = {
            page: page,
            ...(username && username.length !== 0 && { username: username })
        };
        const apiCall = username ? TicketService.getUserCancelTickets : TicketService.getAllCancelTickets;

        apiCall(params, onSuccessCancelTicketCall, onError);
    }

    return (
        <div className=" container">
            <CancelableTicketsTable onSuccessApiCall={onSuccessApiCall} onError={onError} ticketList={ticketList} />
            {typeof totalPages === 'number' && typeof currentPage === 'number' ? (
                <div className="pagination p-4">
                    <PageNumbering maxValue={totalPages} currentPage={currentPage} handlePageClick={fetchNewPage} />
                </div>
            ) : <></>}
        </div>
    );
}

CancelTickets.propTypes = {
    onError: PropTypes.func.isRequired,
    addInfoMessages: PropTypes.func.isRequired,
    username: PropTypes.string
};

export default CancelTickets;