import Cookies from 'js-cookie';

export function isAuthenticated() {
  const authToken = Cookies.get('authToken'); // Retrieve the authentication token from the cookie
  return !!authToken; // Return true if the token exists, indicating the user is authenticated
}