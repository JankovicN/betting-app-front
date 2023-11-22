import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './home/HomePage';
import Login from './auth/Login';
import Register from './auth/Register';
import UserPage from './user/UserPage';
import ErrorPage from './common/ErrorPage';
import { isAuthenticated, isUserAdmin } from '../util/auth';
import { useEffect, useState } from 'react';
import AdminPage from './admin/AdminPage';
import UserDetails from './admin/UserDetails';


const App = () => {
  const [authenticated, setIsAuthenticated] = useState(null);
  const [admin, setUserAdmin] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authStatus = await isAuthenticated();
        setIsAuthenticated(authStatus);
        const adminStatus = await isUserAdmin();
        setUserAdmin(adminStatus);
      } catch (error) {
        console.error('Error fetching admin status:', error);
      }
    };

    fetchData();
  }, []);

  if (admin === null || authenticated=== null) {
    // Admin status is still being fetched, you can show a loading indicator or handle it accordingly
    return <div></div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path='/login'
          element={<Login setIsAuthenticated={setIsAuthenticated} setUserAdmin={setUserAdmin} />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/'
          element={
            authenticated ? (
              admin ? (
                <AdminPage setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <HomePage setIsAuthenticated={setIsAuthenticated} />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path='/profile'
          element={authenticated ? (admin ? <ErrorPage /> : <UserPage setIsAuthenticated={setIsAuthenticated} />) : <Navigate to="/login" />} />
        <Route
          path='/user/:username'
          element={authenticated ?
            admin ? <UserDetails setIsAuthenticated={setIsAuthenticated} /> : <ErrorPage />
            : <Navigate to="/login" />} />
        <Route
          path='/*'
          element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;