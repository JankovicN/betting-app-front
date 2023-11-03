import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './home/HomePage';
import Login from './auth/Login';
import Register from './auth/Register';
import UserPage from './user/UserPage';
import { isAuthenticated } from '../util/auth';
import { useState } from 'react';


const App = () => {
  const [authenticated, setIsAuthenticated] = useState(isAuthenticated());

  return (
    <Router>
      <Routes>
        <Route 
          path='/login' 
          element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/'
          element={authenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route 
          path='/user' 
          element={authenticated? <UserPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;