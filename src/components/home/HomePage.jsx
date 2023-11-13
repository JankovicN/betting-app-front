import Body from "./BodyPage";
import Footer from "../common/Footer";
import Header from "../common/Header";
import PropTypes from 'prop-types';



const HomePage = ({setIsAuthenticated}) => {

    return (
        <div className="container-fluid">
            <Header setIsAuthenticated={setIsAuthenticated}/>
            <Body setIsAuthenticated={setIsAuthenticated}/>
            <Footer />
        </div>
    );
};

HomePage.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired, // Define the 'history' prop
};
export default HomePage;