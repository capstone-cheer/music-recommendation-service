import React, { useState, useEffect, useContext } from "react";
import { IoPlayCircle } from "react-icons/io5"
import "../css/TrackContainer.css";
import TrackCategory from "./TrackCategory";
import TrackInfo from "./TrackInfo";
import AppContext from "./AppContext";
import axios from "axios";

// Container > TrackContainer
function TrackContainer(props) {
    const globalVar = useContext(AppContext);
    const [playlistItems, setPlaylistItems] = useState(null);

    const submitPlaylistToPlay = (value) => {
        console.log(value);
    }

    const getPlaylistItems = async () => {
        await axios.get("/playlists/"+sessionStorage.getItem('member_id')+"/"+ globalVar.selectedPlaylist.playlistId)
        .then(function (res) {
            setPlaylistItems(res.data);
        })
    }

    useEffect(() => {
        getPlaylistItems();
    }, [])

    // 서버에 playlist id값으로 트랙 리스트 fetch
    return(
        <div className="track__container">
            <div className="playlist__info">
                <img src={globalVar.selectedPlaylist.imageUrl} width='200' height='200' alt="cover"/>
                <div className="playlist__info__name">
                    <p>{globalVar.selectedPlaylist.name}</p>
                    <button onClick={ () => {
                        submitPlaylistToPlay(globalVar.selectedPlaylist.name)
                    }}>
                        <IoPlayCircle className="playlist__info__play__circle" size='50' color="#1db954" />
                    </button>
                </div>
                
            </div>
            <div className="playlist__tracks">
                <div className="playlist__track__category">
                    <TrackCategory />
                </div>
                <div className="track__list">
                    {playlistItems && playlistItems.map((track, index) => (
                        <TrackInfo track={track} order={index+1}/>
                    ))}
                </div>    
            </div>
        </div>
    );
}
export default TrackContainer;