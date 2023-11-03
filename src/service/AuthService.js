import Cookies from 'js-cookie';
import api from '../util/api';


const setAuthToken = (token) => {
    if (token) {
        // Set the token in a cookie with an expiration time
        Cookies.set('authToken', token, { expires: 1 / 24 });
    } else {
        console.log("No access token is provided")
    }
};

const setRefreshToken = (refreshToken) => {
    if (refreshToken) {
        // Set the token in a cookie with an expiration time
        Cookies.set('refreshToken', refreshToken, { expires: 15 });
    } else {
        console.log("No refresh token is provided")
    }
};

const login = (username, password, onSuccess, onError) => {
    api
        .post('/login', { username, password })
        .then((response) => {
            console.log("Succesfull login reqeust:")
            console.log(response)
            const responseObject = response.data;
            if (responseObject && responseObject.access_token) {
                setAuthToken(responseObject.access_token);
                setRefreshToken(responseObject.refresh_token);
                onSuccess(responseObject);
            } else {
                onError(response);
            }
        })
        .catch((error) => {
            console.log(error)
            onError(error);
        });
};

const register = (userData, onSuccess, onError) => {
    api
        .post('/user/register', userData)
        .then((response) => {
            onSuccess(response);
        })
        .catch((error) => {
            onError(error);
        });
};

const refreshToken = (onError) => {
    const refreshToken = Cookies.get('refreshToken');
    Cookies.remove('authToken');
    api
        .get('user/token/refresh', {
            headers: { 'Authorization': `Bearer ${refreshToken}` }
        })
        .then((response) => {
            const responseObject = response.data;
            if (responseObject && responseObject.access_token) {
                setAuthToken(responseObject.access_token);
                console.log("Succesfully refreshed the authentication token:")
                console.log(responseObject)
            }
        })
        .catch((error) => {
            console.log("Error refreshing the authentication token:")
            console.log(error)
            onError(error)
        });
};

export default {
    login,
    register,
    refreshToken,
};
