// 사이드바에 렌더링하기 위한 플레이리스트 컴포넌트
import React, { useState, useEffect } from "react";
import "../css/Playlist.css";

function Playlist(props) {
    return (
        <div className="playlist__box">
            <div className="playlist__name">{props.playlistName}</div>
        </div>
    );
}
export default Playlist;