import classes from './Auth.module.css'
import {  useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate('/');
  }

  const navRegister = () => {
    navigate('/register');
  }

  return (
    <div className={` ${classes.auth_container}`}>
      <form className={` ${classes.form_container}`}>
        <h3 className="fs-1 text_center">Sign In</h3>

        <div className="fs-4 mt-5">
          <label>Email address</label>
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
          <button type="submit" className="btn btn-primary" onClick={login}>
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

export default Login;