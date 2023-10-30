import classes from "./Header.module.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/');
    }

    return (
        <header className={`unselectable-text row ps-3 pt-2 pb-2  rounded mb-2 ${classes.header}`}>
            <div className="col-12 col-md-3 m-auto  ms-0 text_center text-md-left  ps-0  fs-2" onClick={goToHomePage}>
                TRIUMPH BET
            </div>
            <div className="col-0 col-md-6">
            </div>
            <div className="col-12 col-md-3 row">
                <div className="col-6 text_center m-auto">
                    <a className="fs-5 link" href="/">Home</a>
                </div>
                <div className="col-6 text_center m-auto">
                    <a className="fs-5 link" href="/user">Profile</a>
                </div>
            </div>
        </header>
    );
};

export default Header;