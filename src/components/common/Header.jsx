import classes from "./Header.module.css";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from "js-cookie";

const Header = ({ setIsAuthenticated, admin }) => {
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/');
    }
    const logoutUser = () => {
        console.log("logging out")
        Cookies.remove("username")
        Cookies.remove("authToken")
        Cookies.remove("admin")
        setIsAuthenticated(false)
    }

    return (
        <header className={`unselectable-text row p-md-0  pb-3  mb-2 ${classes.header}`}>
            <div className="col-12 col-md-3 m-auto mt-3 mt-md-auto text_center text-md-left  ps-0  fs-2" onClick={goToHomePage}>
                TRIUMPH BET
            </div>
            <div className="col-0 col-md-4 p-0">
            </div>
            <div className="col-12 col-md-5 p-0 d-flex align-items-center">
                {admin
                    ?
                    <>
                        <div className="col-0 col-md-8 text_center m-auto" />
                        <div className="col-12 col-md-4 text_center m-auto">
                            <a className="fs-5 link" href="/login" onClick={logoutUser}>Log out</a>
                        </div>
                    </>
                    :
                    <>
                        <div className="col-4 text_center m-auto">
                            <a className="fs-5 link" href="/">Home</a>
                        </div>
                        <div className="col-4 text_center m-auto">
                            <a className="fs-5 link" href="/user">Profile</a>
                        </div>
                        <div className="col-4 text_center m-auto">
                            <a className="fs-5 link" href="/login" onClick={logoutUser}>Log out</a>
                        </div>
                    </>
                }
            </div>
        </header >
    );
};

Header.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired, // Define the 'history' prop
    admin: PropTypes.object,
};

export default Header;