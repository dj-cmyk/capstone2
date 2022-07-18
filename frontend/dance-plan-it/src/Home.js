import React from 'react';
import Login from './Login';
// import { Link } from "react-router-dom";
import "./Home.css"


const Home = () => {

    return(
        <div className="Homepage">
            <h1>Dance Plan-It</h1>
            <h4>All your class plans in one convenient place.</h4>
            {/* <Link className="btn btn-primary btn-lg Home-btn" to='/login'>Log In</Link>
            <Link className="btn btn-primary btn-lg Home-btn" to='/signup'>Sign Up</Link> */}
            <Login />
        </div>
    )
}

export default Home;