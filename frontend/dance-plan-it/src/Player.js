import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { Container } from 'reactstrap';
import './Player.css';


const Player = ({accessToken, uri}) => {

    if (!accessToken) return null;
    
    return(
        <Container className="Player-container">
            <SpotifyPlayer
                token={accessToken}
                uris={uri}
            />
        </Container>
    )
}

export default Player;