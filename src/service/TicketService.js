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

const getUserTickets = (username, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Fetching all tickets for user = ${username}`)
    api.get('/ticket/get', { params: { username } })
        .then((response) => {
            console.log(response.data.data)
            onSuccess(response.data.data);
        })
        .catch((error) => {
            onError(error);
        });
};

export default {
    playTicket,
    getUserTickets
};
