import Footer from "../common/Footer";
import Header from "../common/Header";
import User from "./User";
import PropTypes from 'prop-types';


const UserPage = ({ setIsAuthenticated }) => {

    return (
        <div className=''>
            <Header />
            <User setIsAuthenticated={setIsAuthenticated} />
            <Footer />
        </div>
    );
};

UserPage.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired, // Define the 'history' prop
};

export default UserPage;