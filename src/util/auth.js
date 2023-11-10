import Cookies from 'js-cookie';
import AuthService from '../service/AuthService';

const onError = (data) => {
  console.error('Error refreshing the authentication token:', data);
}

export async function isAuthenticated() {
  const authToken = Cookies.get('authToken');

  if (authToken) {
    return true;
  } else {
    const refreshToken = Cookies.get('refreshToken');

    if (refreshToken) {
      try {
        // Perform an API call to refresh the authentication token using the refresh token
        await AuthService.refreshToken(onError);
        const newAuthToken = Cookies.get('authToken');
        return !!newAuthToken;
      } catch (error) {
        console.error('Error refreshing the authentication token:', error);
        return false;
      }
    }
  }

  console.log("User is not authenticated!");
  return false;
}

