import api from '../util/api';

const getAllOddsForFixture = (fixtureId, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Fething all odds for fixture id ${fixtureId}`)
    api.get(`/betGroup/get/${fixtureId}`)
        .then((response) => {
            console.log(response)
            onSuccess(response.data.data);
        })
        .catch((error) => {
            onError(error)
        });
};

export default {
    getAllOddsForFixture
};
