import api from '../util/api';

const getFixturesForLeague = (leagueId, onSuccess, onError) => {
    console.log(`Fething fixtures for league id ${leagueId}`)
    api.get(`/fixture/ns/${leagueId}`)
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
    getFixturesForLeague
};
