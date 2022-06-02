import React, { useState, useEffect } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import "../css/LoginStatus.css";

function LoginStatus(props) {
    const submitLogout = () => {
        sessionStorage.clear();
        // 스포티파이 쿠키 삭제

        window.location.replace("/");
    }

    return(
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
                        spotify
                    </div>
                </div>
            </div>

            <div className="logout__button">
                <button onClick={() => { submitLogout(); }}>Logout</button>
            </div>
        </div>
    )
}
export default LoginStatus;