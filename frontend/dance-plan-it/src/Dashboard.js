import React from 'react';
import useAuth from './useAuth';
import Player from './Player';



const Dashboard = ({ code }) => {
    const accessToken = useAuth(code)
    console.log(accessToken)
    return(
        <div className="container">
            <h1>DASHBOARD</h1>
            <Player accessToken={accessToken} />
        </div>
    )
}

export default Dashboard;