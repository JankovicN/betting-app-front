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

export default {
    playTicket
};
