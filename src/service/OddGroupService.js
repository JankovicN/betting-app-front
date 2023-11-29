import api from '../util/api';

const getAllOddsForFixture = (fixtureID, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Fething all odds for fixture id ${fixtureID}`)
    api.get(`/oddGroup/get`, { params: { fixtureID } })
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
