import React, { useState, useEffect, useContext } from "react";
import "../css/Playbox.css";
import AppContext from "./AppContext";


function Playbox(props) {
    const globalVar = useContext(AppContext);

    const selectPlaylist = (playlist) => {
        globalVar.changeSelectedPlaylist(playlist);
        globalVar.changeSearchRequest(null);
    }

    return (
        <div className="playbox">
            <button onClick={ () => {
                selectPlaylist(props.playlist);
            }}>
                <img src={props.playlist.imageUrl} width='200' height='200' alt="cover" />
            </button>
            <div>
                {props.playlist.name}
            </div>
        </div>
    );
}
export default Playbox;