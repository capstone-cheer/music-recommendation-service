import React from "react";
import "../css/Player.css";
import SpotifyPlayer from 'react-spotify-web-playback';
import Cookies from 'js-cookie';

class Player extends React.Component {
    render() {
        console.log('Player Render')
        return (
            <div className="player">
                <SpotifyPlayer
                    token={Cookies.get('spotifyAuthToken')}
                    uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
                />
            </div>
        );
    }
}
export default Player;