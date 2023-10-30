import classes from './Auth.module.css'
import {  useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const navLogin = () => {
    navigate('/login');
  }

  return (
    <div className={` ${classes.auth_container}`}>
      <form className={` ${classes.form_container}`}>
        <h3 className="fs-1 text_center">Sign Up</h3>

        <div className="fs-4 mt-5">
          <label>Name</label>
          <input
            type="name"
            className="form-control fs-5 mt-1"
            placeholder="Enter name"
          />
        </div>
        <div className="fs-4 mt-3">
          <label>Surname</label>
          <input
            type="surname"
            className="form-control fs-5 mt-1"
            placeholder="Enter surname"
          />
        </div>
        <div className="fs-4 mt-3">
          <label>Birthday  </label>
          <input
            type="birthday"
            className="form-control fs-5 mt-1"
            placeholder="Enter birthday (example 20/07/2000)"
          />
        </div>
        <div className="fs-4 mt-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control fs-5 mt-1"
            placeholder="Enter email"
          />
        </div>
        <div className="fs-4 mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control fs-5 mt-1"
            placeholder="Enter password"
          />
        </div>
        <div className="d-grid gap-2 mt-5">
          <button type="submit" className="btn btn-primary" onClick={navLogin}>
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