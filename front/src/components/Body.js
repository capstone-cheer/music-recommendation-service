import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import Container from "./Container";
import AppContext from "./AppContext";
import axios from "axios";
import "../css/Body.css";

// Main > Body
function Body(props) {
    const [playlists, setPlaylists] = useState([]);
    const globalVar = useContext(AppContext);
    const getUserPlaylists = async () => {
        await axios.get("/playlists/" + sessionStorage.getItem('member_id'))
        .then(function (res) {
            setPlaylists(() => res.data)
        })
    }

    useEffect(() => {
        getUserPlaylists()
    }, [globalVar.selectedPlaylist])


    return (
        <div className="body">
            <Sidebar 
                playlists={playlists} 
            />
            <Container 
                playlists={playlists}
            />
        </div>
    );
    
}
export default Body;