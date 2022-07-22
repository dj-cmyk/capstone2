import React from 'react';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000"

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=a8701db3365941aea943d79b1b826150&response_type=code&redirect_uri=https://dance-plan-it.surge.sh&scope=streaming%20user-read-private%20user-read-email%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

const Login = () => {
    
    return(
        <div className="container">
            <a className="btn btn-secondary btn-lg" href={AUTH_URL}>Login with Spotify</a>
        </div>
    )
}

export default Login;