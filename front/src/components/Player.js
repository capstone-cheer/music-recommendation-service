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
    const [uriList, setUriList] = useState(['spotify:track:11dFghVXANMlKmJXsNCbNl', 'spotify:track:1oc92BMKYkNxK17C2GtyRM'])
    
    const testTracks = [
        {'id':'1', 'title':'title1', 'artist':'qasdf234we', 'album':'123', 'spotify_id': '0O6u0VJ46W86TxN9wgyqDj'},
        {'id':'2', 'title':'asdqwr', 'artist':'qqwewe', 'album':'123', 'spotify_id': '1oc92BMKYkNxK17C2GtyRM'},
        {'id':'3', 'title':'asdasxcb', 'artist':'qwerwe', 'album':'123', 'spotify_id': '64pa87zjoGMjhPifeIrzhb'},
        {'id':'4', 'title':'asqwzxd', 'artist':'qasdfwe', 'album':'123', 'spotify_id': '0dgldEcoFDEbD4zCmyf9TT'},
        {'id':'5', 'title':'asfagrfhtgykd', 'artist':'asdfzxcqwe', 'album':'123', 'spotify_id': '5eAVdKo6xpIVcrtmB2vyF4'},
        {'id':'6', 'title':'asert2d', 'artist':'qwetwewe', 'album':'123', 'spotify_id': '6GnhWMhgJb7uyiiPEiEkDA'},
        {'id':'7', 'title':'werwerasd', 'artist':'qxcvnswe', 'album':'123', 'spotify_id': '0d8anwJJGti8jE79Y4tXUD'},
    ]
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