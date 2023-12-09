import Cookies from 'js-cookie';
import api from '../util/api';
import { jwtDecode } from "jwt-decode";

const login = (username, password, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Login request`)
    api
        .post('/login', { username, password })
        .then((response) => {
            const responseObject = response.data.data;
            setAuthToken(responseObject.accessToken);
            setUsername(username);
            checkIfUserIsAdmin(responseObject.accessToken);

            onSuccess();
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
            console.log(response)
            onSuccess(response);
        })
        .catch((error) => {
            onError(error);
        });
};

const checkIfUserIsAdmin = (token) => {
    const decodedToken = jwtDecode(token);
    if (decodedToken.roles.includes("ROLE_ADMIN")) {
        setAdmin();
    }

}

const setAuthToken = (token) => {
    if (token) {
        // Set the token in a cookie with an expiration time
        console.log("Setting auth token")
        Cookies.set('authToken', token, { expires: 1 / 24 });
    } else {
        console.log("No access token is provided")
    }
};

const setUsername = (username) => {
    if (username) {
        // Set the token in a cookie with an expiration time
        console.log("Setting username")
        Cookies.set('username', username, { expires: 1 / 24 });
    } else {
        console.log("No username is provided")
    }
};

const setAdmin = () => {
    // Set the token in a cookie with an expiration time
    console.log("Setting admin role")
    Cookies.set('admin', "admin", { expires: 1 / 24 });
}

export default {
    login,
    register
};
