import React, { useState, useEffect } from "react";
import { IoPlayCircle } from "react-icons/io5"
import "../css/RecommendTrackInfo.css";

function RecommendTrackInfo(props) {
    const [isMouseOver, setIsMouseOver] = useState(0);

    const submitTrackToPlay = (value) => {
        props.submitTrackFromItem(value);
    }

    return(
        <div className="recommend__track__info" onMouseOver={ () => setIsMouseOver(1)}
                                        onMouseOut={ () => setIsMouseOver(0)}>
            <div className="recommend__track__order">
                {props.order}
            </div>
            {isMouseOver ?
                <div className="recommend__track__info__play__button">
                    <button onClick={ () => {
                        submitTrackToPlay(props.order-1)
                    }}>
                        <IoPlayCircle className="recommend__track__info__play__circle" size='50' color="#1db954" />
                    </button>
                </div>
                : <img src={props.track.imageUrl} className="recommend__track__cover" alt="cover"/>
            }
            

            <div className="recommend__track__detail">
                <div className="recommend__album__title__box">
                    <div className="recommend__title__info">
                        {props.track.name}
                    </div>
                    <div className="recommend__album__info">
                        {props.track.albumName}
                    </div>
                </div>

                <div className="recommend__artist__box">
                    <div className="recommend__artist__info">
                        {props.track.artistName}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RecommendTrackInfo;