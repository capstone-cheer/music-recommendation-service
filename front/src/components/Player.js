import React from "react";
import "../css/Player.css";

class Player extends React.Component {
    render() {
        console.log('Player Render')
        return (
            <div className="player">플레이어</div>
        );
    }
}
export default Player;