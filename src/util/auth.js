import Cookies from 'js-cookie';


export async function isAuthenticated() {
  const authToken = Cookies.get('authToken');

  if (authToken) {
    return true;
  }

  console.log("User is not authenticated!");
  return false;
}

export async function isUserAdmin() {
  const admin = Cookies.get('admin');

  if (admin) {
    console.log("ADMIN ADMIN ADMIN!");
    return true;
  }

  console.log("User is not admin!");
  return false;
}

