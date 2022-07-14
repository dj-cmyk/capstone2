import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { Container } from 'reactstrap';
import './Player.css';


const Player = ({accessToken}) => {

    if (!accessToken) return null;
    
    return(
        <Container className="Player-container">
            <SpotifyPlayer
                token={accessToken}
                uris={'spotify:track:74jQK0XwwtUvM5OisddMzi'}
            />
        </Container>
    )
}

export default Player;