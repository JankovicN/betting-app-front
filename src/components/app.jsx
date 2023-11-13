import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './home/HomePage';
import Login from './auth/Login';
import Register from './auth/Register';
import UserPage from './user/UserPage';
import { isAuthenticated, isUserAdmin } from '../util/auth';
import { useState } from 'react';


const App = () => {
  const [authenticated, setIsAuthenticated] = useState(isAuthenticated());
  const [admin, setUserAdmin] = useState(isUserAdmin());

  return (
    <Router>
      <Routes>
        <Route
          path='/login'
          element={<Login setIsAuthenticated={setIsAuthenticated} setUserAdmin={setUserAdmin} />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/'
          element={authenticated ?
            admin ? <HomePage setIsAuthenticated={setIsAuthenticated} /> : <HomePage setIsAuthenticated={setIsAuthenticated} />
            : <Navigate to="/login" />} />
        <Route
          path='/user'
          element={authenticated ?
            admin ? <UserPage setIsAuthenticated={setIsAuthenticated} /> : <UserPage setIsAuthenticated={setIsAuthenticated} />
            : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;