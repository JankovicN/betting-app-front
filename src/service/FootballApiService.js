import api from '../util/api';

const getNewFixtures = (onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Fething new Fixtures from FootballAPI!`)
    api.post('/api/new/fixturesAndOdds')
        .then((response) => {
            console.log(response.data);
            onSuccess(response.data);
        })
        .catch((error) => {
            onError(error);
        });
};


export default {
    getNewFixtures
};
