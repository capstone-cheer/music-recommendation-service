import React, { useState, useEffect } from "react";
import { IoPlayCircle } from "react-icons/io5"
import "../css/TrackInfo.css";

function TrackInfo(props) {
    const [isMouseOver, setIsMouseOver] = useState(0);

    const submitTrackToPlay = (value) => {
        console.log(value);
    }

    return(
        <div className="track__info" onMouseOver={ () => setIsMouseOver(1)}
                                        onMouseOut={ () => setIsMouseOver(0)}>
            <div className="track__order">
                {props.order}
            </div>
            {isMouseOver ?
                <div className="track__info__play__button">
                    <button onClick={ () => {
                        submitTrackToPlay(props.track.id)
                    }}>
                        <IoPlayCircle className="track__info__play__circle" size='50' color="#1db954" />
                    </button>
                </div>
                : <img src="https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1" className="track__cover" alt="cover"/>
            }
            

            <div className="track__detail">
                <div className="album__title__box">
                    <div className="title__info">
                        {props.track.name}
                    </div>
                    <div className="album__info">
                        {props.track.albumName}
                    </div>
                </div>

                <div className="artist__box">
                    <div className="artist__info">
                        {props.track.artistName}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TrackInfo;