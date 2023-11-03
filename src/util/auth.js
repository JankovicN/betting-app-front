import Cookies from 'js-cookie';
import AuthService from '../service/AuthService';

const onError = (data) => {
  console.error('Error refreshing the authentication token:', data);

}

export async function isAuthenticated() {
  const authToken = Cookies.get('authToken'); // Retrieve the authentication token from the cookie

  if (authToken) {
    return true; // The user is already authenticated
  } else {
    const refreshToken = Cookies.get('refreshToken'); // Retrieve the refresh token from the cookie

    if (refreshToken) {
      try {
        // Perform an API call to refresh the authentication token using the refresh token
        AuthService.refreshToken(onError);
        const newAuthToken = Cookies.get('authToken');
        return !!newAuthToken;
      } catch (error) {
        console.error('Error refreshing the authentication token:', error);
      }
    }
  }

  return false; // The user is not authenticated
}
