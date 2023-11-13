import api from '../util/api';

const getAllLeagues = (onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Fething all Leagues!`)
    api.get('/league/get/all')
        .then((response) => {
            console.log(response);
            onSuccess(response);
        })
        .catch((error) => {
            onError(error);
        });
};

const getFixturesForLeague = (leagueID, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Fething fixtures for league id ${leagueID}!`)
    api.get(`/league/ns`, { params: { leagueID } })
        .then((response) => {
            console.log(response);
            onSuccess(response);
        })
        .catch((error) => {
            onError(error)
        });
};

export default {
    getAllLeagues,
    getFixturesForLeague
};
