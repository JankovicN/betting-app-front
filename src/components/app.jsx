import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './home/HomePage';
import Login from './auth/Login';
import Register from './auth/Register';
import UserPage from './user/UserPage';


const App = () => {
    return (
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/user' element={<UserPage />} />
          </Routes>
      </Router>
    );
};

export default App;