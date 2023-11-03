import api from '../util/api';

const getAllLeagues = ( onSuccess, onError) => {
    api.get('/league/get/all')
        .then((response) => {
            console.log(response)
            if (response.data.errorMessages && response.data.errorMessages.length !== 0) {
                onError(response);
            } else {
                onSuccess(response.data.data);
            }
        })
        .catch((error) => {
            console.log("Unknown error:")
            console.log(error)
            onError(error);
        });
};

const getFixturesForLeague = (leagueId, onSuccess, onError) => {
    console.log(`Fething fixtures for league id ${leagueId}`)
    api.get(`/league/ns/${leagueId}`)
        .then((response) => {
            console.log(response)
            if (response.data.errorMessages && response.data.errorMessages.length !== 0) {
                console.log(response);
            } else {
                onSuccess(response.data.data);
            }
        })
        .catch((error) => {
            console.log(error)
            onError(error)
        });
};

export default {
    getAllLeagues,
    getFixturesForLeague
};
