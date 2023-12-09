import api from '../util/api';

const playTicket = (ticket, onSuccess, onError) => {
    console.log("=====================================================")
    console.log("Playing ticket:")
    console.log(ticket)
    api.post('/ticket/new', ticket)
        .then((response) => {
            console.log(response)
            onSuccess();
        })
        .catch((error) => {
            onError(error);
        });
};

const getUserTickets = (params, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Fetching all tickets for user = ${params.username}`)
    console.log(params)
    api.get('/ticket/get', { params: params })
        .then((response) => {
            console.log(response.data.data)
            onSuccess(response.data.data);
        })
        .catch((error) => {
            onError(error);
        });
};

const getUserCancelTickets = ( params, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Fetching all cancelable tickets for user = ${params.username}`)
    api.get('/ticket/get/cancelable', { params: params })
        .then((response) => {
            console.log(response.data.data)
            onSuccess(response.data.data);
        })
        .catch((error) => {
            onError(error);
        });
};

const getAllTickets = ( params, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Fetching all tickets`)
    console.log(params)
    api.get('/ticket/get/all', { params: params })
        .then((response) => {
            console.log(response.data.data)
            onSuccess(response.data.data);
        })
        .catch((error) => {
            onError(error);
        });
};

const getAllCancelTickets = ( params, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Fetching all cancelable tickets`)
    api.get('/ticket/get/cancelable', { params: params })
        .then((response) => {
            console.log(response.data.data)
            onSuccess(response.data.data);
        })
        .catch((error) => {
            onError(error);
        });
};

const cancelTicket = ( ticket, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Canceling ticket ${ticket.id}`)
    api.delete('/ticket/delete', { params: { ticketID: ticket.id } })
        .then((response) => {
            console.log(response.data)
            onSuccess(response.data);
        })
        .catch((error) => {
            onError(error);
        });
};

const updateTickets = (onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Updating all tickets`)
    api.patch('/ticket/update')
        .then((response) => {
            console.log(response.data)
            onSuccess(response.data);
        })
        .catch((error) => {
            onError(error);
        });
};

export default {
    playTicket,
    getUserTickets,
    getAllTickets,
    getUserCancelTickets,
    getAllCancelTickets,
    cancelTicket,
    updateTickets
};
