import React, { useState, useEffect } from "react";
import "../css/TrackInfo.css";

function TrackInfo(props) {
    return(
        <div className="track__info">
            <div className="track__order">
                {props.order}
            </div>

            <img src="https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1" className="track__cover" alt="cover"/>

            <div className="track__detail">
                <div className="album__title__box">
                    <div className="title__info">
                        {props.track.title}
                    </div>
                    <div className="album__info">
                        {props.track.album}
                    </div>
                </div>

                <div className="artist__box">
                    <div className="artist__info">
                        {props.track.artist}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TrackInfo;