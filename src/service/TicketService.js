import api from '../util/api';

const getAllLeagues = ( onSuccess, onError) => {
    api.post('/league/get/all')
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

export default {
    getAllLeagues
};
