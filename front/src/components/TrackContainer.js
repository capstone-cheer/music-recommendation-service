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

    const submitPlaylistToPlay = () => {
        const tmpPlayTrackList = [];
        props.playlistItems && props.playlistItems.map((track, index) => {
            tmpPlayTrackList.push('spotify:track:'+track.id);
        })
        globalVar.changePlayingTrackList(tmpPlayTrackList)
    }
    console.log('추천 카테고리',globalVar.recommendCategory)

    const submitTrackFromItem = (value) => {
        const tmpPlayTrackList = [];
        props.playlistItems && props.playlistItems.map((track, index) => {
            if (index >= value) {
                tmpPlayTrackList.push('spotify:track:'+track.id);
            }
        })
        globalVar.changePlayingTrackList(tmpPlayTrackList)
    }

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
                    {props.playlistItems && props.playlistItems.map((track, index) => (
                        <TrackInfo track={track} order={index+1} submitTrackFromItem={submitTrackFromItem} />
                    ))}
                </div>    
            </div>
        </div>
    );
}
export default TrackContainer;