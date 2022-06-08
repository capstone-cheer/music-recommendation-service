import React, { useState, useEffect } from "react";
import '../css/CategoryRow.css';
import Playbox from "./Playbox";

function CategoryRow(props) {
    return (
        <div className="playlist__frame">
                {props.playlists && props.playlists.map((playlist, index) => (
                    <Playbox playlist={playlist} key={index} />
                ))}
        </div>
    );
}
export default CategoryRow;