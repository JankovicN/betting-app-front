import Footer from "../common/Footer";
import Header from "../common/Header";
import PropTypes from 'prop-types';
import AdminBody from "./AdminBody";



const AdminPage = ({ setIsAuthenticated }) => {

    return (
        <div className="container-fluid">
            <Header setIsAuthenticated={setIsAuthenticated} admin={true} />
            <AdminBody setIsAuthenticated={setIsAuthenticated} />
            <Footer />
        </div>
    );
};

AdminPage.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired, // Define the 'history' prop
};
export default AdminPage;