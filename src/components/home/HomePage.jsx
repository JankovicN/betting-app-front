import Body from "./Body";
import Footer from "../common/Footer";
import Header from "../common/Header";

import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {

    const navigate = useNavigate();

    // Check if the token is present in local storage
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            // Token is present, redirect to the desired page
            navigate('/login');
        }
    }, []);
    return (
        <div  className='main_container'>
            <Header />
            <Body />
            <Footer />
        </div>
    );
};

export default HomePage;