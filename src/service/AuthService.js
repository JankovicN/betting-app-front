import Cookies from 'js-cookie';
import api from '../util/api';

const login = (username, password, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Login request`)
    api
        .post('/login', { username, password })
        .then((response) => {
            const responseObject = response.data;
            if (responseObject && responseObject.access_token) {
                setAuthToken(responseObject.access_token);
                setRefreshToken(responseObject.refresh_token);
                setUsername(username);
                onSuccess();
            } else {
                onError(response);
            }
        })
        .catch((error) => {
            onError(error);
        });
};

const register = (userData, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Register request`)
    api
        .post('/user/register', userData)
        .then((response) => {
            onSuccess(response);
        })
        .catch((error) => {
            if (error === undefined || error.response === undefined) {
                console.log(error)
            } else {
                console.log(error)
                onError(error);
            }
        });
};

const refreshToken = (onError) => {
    console.log("=====================================================")
    console.log(`Refresh token request`)
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
                window.location.reload()
            }
        })
        .catch((error) => {
            Cookies.remove('refreshToken');
            console.log(error)
            onError(error);
        });
};

const setAuthToken = (token) => {
    if (token) {
        // Set the token in a cookie with an expiration time
        console.log("Setting auth token")
        Cookies.set('authToken', token, { expires: 1 / 24 });
    } else {
        console.log("No access token is provided")
    }
};

const setRefreshToken = (refreshToken) => {
    if (refreshToken) {
        // Set the token in a cookie with an expiration time
        console.log("Setting refresh token")
        Cookies.set('refreshToken', refreshToken, { expires: 15 });
    } else {
        console.log("No refresh token is provided")
    }
};

const setUsername = (username) => {
    if (username) {
        // Set the token in a cookie with an expiration time
        console.log("Setting username")
        Cookies.set('username', username, { expires: 15 });
    } else {
        console.log("No username is provided")
    }
};

export default {
    login,
    register,
    refreshToken
};
