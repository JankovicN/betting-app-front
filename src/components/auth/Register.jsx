import { useState } from 'react';
import classes from './Auth.module.css'
import { useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService';
import Cookies from 'js-cookie';
import AuthService from '../../service/AuthService';

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    {
      name: '',
      surname: '',
      birthday: '',
      email: '',
      username: '',
      password: '',
    });
  const [errorMessage, setErrorMessage] = useState('');
  const [touchedFields, setTouchedFields] = useState({});

  const navLogin = () => {
    navigate('/login');
  }

  const registerUser = () => {
    const emptyFields = Object.keys(formData).filter((field) => {
      const value = formData[field];

      if (field === 'password') {
        // Password input
        return !value || value.trim() === '';
      } else {
        // Default (text) input
        return !value;
      }
    });

    if (emptyFields.length > 0) {
      console.log('Empty fields:', emptyFields);
      // If there are empty fields, set an error message
      setErrorMessage(`Please fill out the following fields: ${emptyFields.join(', ')}`);

      // Highlight empty fields with a CSS class
      setTouchedFields((prevTouchedFields) => {
        const highlightedFields = { ...prevTouchedFields };
        emptyFields.forEach((field) => {
          highlightedFields[field] = true;
        });
        return highlightedFields;
      });
    } else {
      console.log('All fields filled:', formData);
      setErrorMessage('');
      AuthService.register(formData, onSuccessFunction, onErrorFunction)
      // Handle form submission
    }

  }

  const onSuccessFunction = () => {
    console.log("Successfully registered");
    Cookies.set('registered', 'registered')
    navigate('/login');
  };

  const onErrorFunction = (error) => {
    console.log(error)
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
      } else if (error.response !== undefined && error.response.data !== undefined && error.response.data.errorMessages !== undefined) {
        setErrorMessage(error.response.data.errorMessages[0]);
      } else {
        console.log(error)
      }
    } else {
      console.log("Error while trying to login: ");
      console.log(error)
    }
    // Handle the error appropriately. For example, you can set an error message state.
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTouchedFields((prevTouchedFields) => {
      const highlightedFields = { ...prevTouchedFields };
      highlightedFields[name] = false;
      return highlightedFields;
    });
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className={`unselectable-text ${classes.auth_container}`}>
      <form className={` ${classes.registration_container}`}>
        <h3 className="fs-1 text_center">Sign Up</h3>

        {Object.keys(formData).map((field) => (
          <div key={field} className={`fs-4 mt-4 `}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'password' ? 'password' : field === 'birthday' ? 'date' : 'text'}
              className={`form-control fs-5 mt-1 ${touchedFields[field] ? classes.highlight_empty : ''}`}
              id={field}
              name={field}
              placeholder={`Enter ${field}`}
              value={formData[field]}
              onChange={handleInputChange}
            />
          </div>
        ))}

        {errorMessage && <p className='mt-2 p-1 fs-5 fw-bold text-center text-danger'>{errorMessage}</p>}
        <div className="d-grid gap-2 mt-5">
          <button type="button" className="btn btn-primary" onClick={registerUser}>
            Submit
          </button>
        </div>
        <div className="text_center">
          Already registered?{" "}
          <span className="link-primary" onClick={navLogin}>
            Sign In
          </span>
        </div>
      </form>
    </div>
  )
};

export default Register;