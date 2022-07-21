import React from 'react';
import Login from './Login';

import "./Home.css"


const Home = () => {

    return(
        <div className="Homepage">
            <h1>Dance Plan-It</h1>
            <h4>All your class plans in one convenient place.</h4>
    
            <Login />
        </div>
    )
}

export default Home;