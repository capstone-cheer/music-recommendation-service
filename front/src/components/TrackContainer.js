import React, { useState, useEffect, useContext } from "react";
import { IoPlayCircle } from "react-icons/io5"
import "../css/TrackContainer.css";
import TrackCategory from "./TrackCategory";
import TrackInfo from "./TrackInfo";
import AppContext from "./AppContext";
import axios from "axios";

const playlist = {
    'id':'1',
    'name':'',
    'tracks': [
        {'id':'1', 'title':'title1', 'artist':'qasdf234we', 'album':'123'},
        {'id':'2', 'title':'asdqwr', 'artist':'qqwewe', 'album':'123'},
        {'id':'3', 'title':'asdasxcb', 'artist':'qwerwe', 'album':'123'},
        {'id':'4', 'title':'asqwzxd', 'artist':'qasdfwe', 'album':'123'},
        {'id':'5', 'title':'asfagrfhtgykd', 'artist':'asdfzxcqwe', 'album':'123'},
        {'id':'6', 'title':'asert2d', 'artist':'qwetwewe', 'album':'123'},
        {'id':'7', 'title':'werwerasd', 'artist':'qxcvnswe', 'album':'123'},
        {'id':'8', 'title':'xcvbasd', 'artist':'qwdfgjde', 'album':'123'},
        {'id':'9', 'title':'asdghasd', 'artist':'qertewwe', 'album':'123'},
        {'id':'10', 'title':'qweasdasd', 'artist':'sdfgsqwe', 'album':'123'},
        {'id':'11', 'title':'asgdxcbasd', 'artist':'qsdfhcvwe', 'album':'123'},
        {'id':'12', 'title':'dafydryasd', 'artist':'qxcvbwwe', 'album':'123'},
        {'id':'13', 'title':'xcvbasd', 'artist':'qweasfqwe', 'album':'123'},
        {'id':'14', 'title':'werqasd', 'artist':'ngdfqwe', 'album':'123'},
    ]
}

// Container > TrackContainer
function TrackContainer(props) {
    const globalVar = useContext(AppContext);
    const [playlistItems, setPlaylistItems] = useState(null);

    const submitPlaylistToPlay = (value) => {
        console.log(value);
    }

    const getPlaylistItems = async () => {
        await axios.get("/playlists/"+sessionStorage.getItem('member_id')+"/"+ globalVar.selectedPlaylist.playlist_id)
        .then(function (res) {
            setPlaylistItems(res.data);
        })
    }

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
                    {playlist.tracks && playlist.tracks.map((track, index) => (
                        <TrackInfo track={track} order={index+1}/>
                    ))}
                </div>    
            </div>
        </div>
    );
}
export default TrackContainer;