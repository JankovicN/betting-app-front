import api from '../util/api';

const getUserInformation = (username, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Fething Information for user  ${username}`)
    api.get(`/user/get`, { params: { username } })
        .then((response) => {
            console.log(response)
            onSuccess(response.data.data);
        })
        .catch((error) => {
            onError(error)
        });
};

const updateUser = (username,userData, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Updating user  ${username}`)
    api.put(`/user/update`, userData)
        .then((response) => {
            console.log(response)
            onSuccess(response.data.data);
        })
        .catch((error) => {
            onError(error)
        });
};

export default {
    getUserInformation,
    updateUser
};
