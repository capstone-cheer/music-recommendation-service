import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { IoPersonCircleOutline } from "react-icons/io5";
import SpotifyAuth from "./SpotifyAuth";
import "../css/LoginStatus.css";
import axios from "axios";

function LoginStatus(props) {
    const [SpotifyAuthToken, setSpotifyAuthToken] = useState();
    const [userId, setUserId] = useState();
    const [spotifyId, setSpotifyId] = useState();
    const config = require('../config.json');

    const fetchSpotifyProfile = async () => {
        await axios.get("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${Cookies.get('spotifyAuthToken')}`
                }
            }).then(function (res) {
                console.log('spotify res : ', res.data.display_name)
                setSpotifyId(res.data.display_name);
            }).catch(function (err) {
                console.log('spotify err : ', err)
            })
    }

    useEffect(() => {
        setSpotifyAuthToken(Cookies.get('spotifyAuthToken'))
        setUserId(sessionStorage.getItem('user_id'));
        if(Cookies.get('spotifyAuthToken')) {
            fetchSpotifyProfile();
        };
    }, [sessionStorage.getItem('user_id')]);

    const submitLogout = () => {
        sessionStorage.clear();
        Cookies.remove('spotifyAuthToken')
        window.location.replace("/");
    }

    return(
        <div>
            {Cookies.get('spotifyAuthToken') ? (
                <div className="status__box">
                    <div className="login__status__box">
                        <div className="local__login__status">
                            <div className="local__login__icon">
                                <IoPersonCircleOutline size='24' color="white" />
                            </div>
                            <div className="local__login__info">
                                {sessionStorage.getItem('user_id')}
                            </div>
                        </div>
                        <div className="spotify__login__status">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                                alt=""
                                height='24px'
                                width='24px'
                            />
                            <div className="spotify__login__id">
                                { spotifyId }
                            </div>
                        </div>
                    </div>
                    <div className="logout__button">
                        <button onClick={() => { submitLogout(); }}>Logout</button>
                    </div>
                </div>
            ) : (
                <div className="status__box">
                    <div className="login__status__box">
                        <div className="local__login__status">
                            <div className="local__login__icon">
                                <IoPersonCircleOutline size='24' color="white" />
                            </div>
                            <div className="local__login__info">
                                {sessionStorage.getItem('user_id')}
                            </div>
                        </div>
                        <div className="spotify__login__status">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                                alt=""
                                height='24px'
                                width='24px'
                            />
                            <SpotifyAuth
                                btnClassName="spotify__login__btn"
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
                    </div>
                    <div className="logout__button">
                        <button onClick={() => { submitLogout(); }}>Logout</button>
                    </div>
                </div>      
            )}
        </div>


        
    )
}
export default LoginStatus;