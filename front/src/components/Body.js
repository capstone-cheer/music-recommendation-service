import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Container from "./Container";
import axios from "axios";
import "../css/Body.css";

const playlists = [
    {"id": 1, "name" : 'asd', 'imageUrl' : "https://i.scdn.co/image/ab67616d0000b2732c5b24ecfa39523a75c993c4"},
    {"id": 2, "name" : 'sdf', 'imageUrl' : "https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1"},
    {"id": 3, "name" : 'wer', 'imageUrl' : "https://i.scdn.co/image/ab67616d0000b2732c5b24ecfa39523a75c993c4"},
    {"id": 4, "name" : 'ert', 'imageUrl' : "https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1"},
    {"id": 5, "name" : 'xcv', 'imageUrl' : "https://i.scdn.co/image/ab67616d0000b2732c5b24ecfa39523a75c993c4"},
    {"id": 6, "name" : 'xcb', 'imageUrl' : "https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1"},
]

// Main > Body
function Body(props) {
    const [playlists, setPlaylists] = useState([]);
    const getUserPlaylists = async () => {
        await axios.get("/playlists/"+sessionStorage.getItem('member_id'))
        .then(function (res) {
            setPlaylists(res.data)
        })
    }

    useEffect(() => {
        getUserPlaylists()
    })


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