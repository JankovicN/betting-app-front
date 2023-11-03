import Cookies from 'js-cookie';
import api from '../util/api';


const setAuthToken = (token, refreshToken) => {
    if (token) {
        // Set the token in a cookie with an expiration time
        Cookies.set('authToken', token, { expires: 7 });
        Cookies.set('refreshToken', refreshToken, { expires: 7 });
    } else {
        console.log("No token is provided")
    }
};

const login = (username, password, onSuccess, onError) => {
    api
        .post('/login', { username, password })
        .then((response) => {
            console.log(response)
            if (response.data && response.data.access_token) {
                const token = response.data.access_token;
                const refreshToken = response.data.refresh_token;
                setAuthToken(token, refreshToken);
                onSuccess(response);
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

const refreshTokens = (refreshToken, onSuccess, onError) => {
    api
        .post('/refresh', { refresh_token: refreshToken })
        .then((response) => {
            if (response.data && response.data.access_token) {
                const token = response.data.access_token;
                setAuthToken(token);
                onSuccess(response);
            } else {
                onError(response);
            }
        })
        .catch((error) => {
            onError(error);
        });
};

export default {
    login,
    register,
    refreshTokens,
};
