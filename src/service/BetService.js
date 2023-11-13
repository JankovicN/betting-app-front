import api from '../util/api';


const getBetsForTicket = (ticketID, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Fetching bets for ticket ID = ${ticketID}`)
    api.get('/bet/get', { params: { ticketID } })
        .then((response) => {
            console.log(response.data.data)
            onSuccess(response.data.data);
        })
        .catch((error) => {
            onError(error);
        });
};

export default {
    getBetsForTicket
};
