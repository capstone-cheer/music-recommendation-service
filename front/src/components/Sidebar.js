import React, { useContext } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import "../css/Sidebar.css";
import Playlist from "./Playlist";
import AppContext from "./AppContext";

// Body > Sidebar
function Sidebar(props) {
    const globalVar = useContext(AppContext);

    const selectPlaylist = (playlist, index) => {
        globalVar.changeSelectedPlaylist(playlist);
        globalVar.changeSearchRequest(null);
    }

    // 서버에 플레이리스트 정보를 fetch
    console.log('Sidebar Render');
    
    return (
        <div className="sidebar">
            <div className="sidebar__title">PLAYLISTS</div>
            <button className="add__new__playlist">
                <BsFillPlusCircleFill className="playlist__add__button" size={20} color="#1db954"/>
                <div className="add__button__text">
                    <p>New Playlist</p>
                </div>
            </button>
            <ul>
                {props.playlists && props.playlists.map((playlist, index) => (
                    <li key={index}>
                        <button onClick={ () => {
                                selectPlaylist(playlist, index);
                            }}>
                            <Playlist playlistName={playlist.name} />
                        </button>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Sidebar;