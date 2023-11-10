import classes from './Auth.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthService from '../../service/AuthService';
import PropTypes from 'prop-types';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSuccessFunction = () => {
    console.log("Successfully logged in ");
    setIsAuthenticated(true);
    navigate('/');
  };

  const onErrorFunction = (error) => {
    if (error.code !== undefined) {
      if (error.code === 'ERR_NETWORK') {
        const networkError = (
          <>
            Cannot connect to the server at this time.
            <br />
            Try again later!
          </>
        );
        setErrorMessage(networkError);
        setIsAuthenticated(false)
      } else if (error.response !== undefined && error.response.errorMessages !== null) {
        setErrorMessage("Invalid username or password!");
      } else {
        console.log(error)
      }
    } else {
      console.log("Error while trying to login: ");
      console.log(error)
    }
    // Handle the error appropriately. For example, you can set an error message state.
  };

  const loginAction = () => {
    const { username, password } = formData;
    setErrorMessage("");
    AuthService.login(
      username,
      password,
      () => {
        // Handle success here
        onSuccessFunction()
      },
      (error) => {
        // Handle error here
        onErrorFunction(error)
        // You can set an error message state or display an error message to the user.
      }
    );
  };



  const navRegister = () => {
    navigate('/register');
  }

  return (
    <div className={`unselectable-text ${classes.auth_container}`}>

      <form className={` ${classes.form_container}`}>
        <h3 className="fs-1 text_center">Sign In</h3>

        <div className="fs-4 mt-5">
          <label>Usernanme</label>
          <input
            type="text"
            className="form-control fs-5 mt-1"
            name="username"
            placeholder="Enter username"
            onChange={handleInputChange}
          />
        </div>
        <div className="fs-4 mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control fs-5 mt-1"
            name="password"
            placeholder="Enter password"
            onChange={handleInputChange}
          />
        </div>

        {errorMessage && <p className='mt-2 p-1 fs-5 fw-bold text-center text-danger'>{errorMessage}</p>}
        <div className="d-grid gap-2 mt-5">
          <button type="button" className="btn btn-primary" onClick={loginAction}>
            Submit
          </button>
        </div>
        <div className="text_center mt-3">
          Not registered yet?{" "}
          <span className="link-primary" onClick={navRegister}>
            Sign Up
          </span>
        </div>
      </form>
    </div>
  )

};

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};



export default Login;