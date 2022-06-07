import React, {useState, useContext, useEffect} from "react";
import "../css/Player.css";
import SpotifyPlayer from 'react-spotify-web-playback';
import SpotifyAuth from "./SpotifyAuth";
import Cookies from 'js-cookie';
import AppContext from "./AppContext";
import { IoConstructOutline } from "react-icons/io5";

const sdkStyle = {
    color: '#888888',
    bgColor: '#151515',
    height: '15vh',
    width: '100vw',
    trackArtistColor: '#777777',
    trackNameColor: '#ffffff',
}

const makeTrackUriList = (tracks) => {
    const uriList = []
    tracks && tracks.map((track, index) => {
        const tempUri = 'spotify:track:' + track.spotify_id;
        uriList.push(tempUri);
    })
    return uriList;
}

function Player(props) {
    const config = require('../config.json');
    const globalVar = useContext(AppContext);

    console.log('Player Render', globalVar.selectedPlaylist)

    useEffect(() => {
        console.log('플레이어', globalVar.playingTrackList)
    },[globalVar.playingTrackList])
    
    return (
        <div className="player">
            {Cookies.get('spotifyAuthToken') ? (
                <div className="spotify__player__sdk">
                    <SpotifyPlayer
                        token={Cookies.get('spotifyAuthToken')}
                        styles={sdkStyle}
                        uris={globalVar.playingTrackList}
                        autoPlay={true}
                    />
                </div>
                
            ):(
                <div className="player__need__login">
                    <SpotifyAuth
                            btnClassName="player__spotify__login__btn"
                            redirectUri={ "http://localhost:3000/callback/" }
                            clientID={ config.development.spotify_client_id }
                            title={"Spotify Login"}
                            noLogo={true}
                            scopes={ [
                                "streaming",
                                "user-read-currently-playing",
                                "user-read-recently-played",
                                "user-read-playback-state",
                                "user-top-read",
                                "user-modify-playback-state",
                                "user-read-private", 
                                "user-read-email", 
                                "user-library-read",
                                "user-library-modify",
                            ] }
                        />
                </div>
            )}
            
        </div>
    );
}
export default Player;