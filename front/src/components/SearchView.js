import React, { useState, useEffect, useContext } from "react";
import "../css/SearchView.css";
import AppContext from "./AppContext";
import { IoAddCircle, IoPlayCircle } from "react-icons/io5"
import axios from "axios"


function SearchResultCategory() {
    // 30 25 25
    return(
        <div className="search__result__category">
            <div className="search__result__category__title">
                <p>TITLE</p>
            </div>
            <div className="search__result__category__album">
                <p>ALBUM</p>
            </div>
            <div className="search__result__category__artist">
                <p>ARTIST</p>
            </div>
        </div>
    );
};

function SearchResultTrack(props) {
    const globalVar = useContext(AppContext);
    const [isMouseOver, setIsMouseOver] = useState(0);

    const submitTrackToPlay = (value) => {
        props.submitTrackFromItem(value);
    }

    const addTrackToPlaylist = async () => {
        // 선택한 트랙을 현재 재생 중인 플레이리스트에 추가
        console.log(props.track.id, "to ", globalVar.selectedPlaylist);
        await axios.post('/playlists/'+ globalVar.selectedPlaylist.playlistId +"/add", {
            songIdList : [
                props.track.id
            ]
        }).then(function (res) {
            console.log(res)
        })
    }

    // 35 25 20 5
    return (
        <div className="search__result__track" onMouseOver={ () => setIsMouseOver(1)}
                                                onMouseOut={ () => setIsMouseOver(0)}>
            <div className="search__result__track__title">
                {isMouseOver ?
                    <div className="search__result__track__play__button">
                        <button onClick={ () => {
                            submitTrackToPlay(props.order)
                        }}>
                            <IoPlayCircle className="search__result__track__play__circle" size='50' color="#1db954" />
                        </button>
                    </div>
                    : <img src={props.track.imageUrl} 
                            className="search__result__track__cover" 
                            alt="cover"
                />
                }

                <p>{props.track.name}</p>
            </div>
            <div className="search__result__track__album">
                <p>{props.track.albumName}</p>
            </div>
            <div className="search__result__track__artist">
                <p>{props.track.artistName}</p>
            </div>
            <div className="search__result__track__add">
                <button onClick={ () => {
                    addTrackToPlaylist();
                }}>
                    <IoAddCircle size={30} color={'green'}/>
                </button>
            </div>
        </div>
    );
}

function SearchView(props) {
    // 검색결과 전역변수 선언
    const globalVar = useContext(AppContext);
    const [ searchViewTrack, setSearchViewTrack ] = useState(globalVar.searchResponse);

    const submitTrackFromItem = (value) => {
        console.log('submit from track', value)
        const tmpPlayTrackList = [];
        searchViewTrack && searchViewTrack.map((track, index) => {
            if (index >= value) {
                tmpPlayTrackList.push('spotify:track:'+track.id);
            }
        })
        globalVar.changePlayingTrackList(tmpPlayTrackList)
    }

    const getSearchOutput = async () => {
        await axios.get("/search?keyword="+props.searchRequest)
        .then(function (res) {
            setSearchViewTrack(res.data)
        })
    }

    useEffect(() => {
        getSearchOutput();
    }, [props.searchRequest])

    return (
        <div className="search__view">
            <div className="search__result__num">
                {searchViewTrack !== null?(
                    searchViewTrack.length + '개의 검색 결과'
                ):(
                    '0개의 검색 결과'
                )}
            </div>
            <SearchResultCategory />
            <ul>
                {searchViewTrack && searchViewTrack.map((track, index) => (
                    <li key={index}>
                        <SearchResultTrack track={track} submitTrackFromItem={submitTrackFromItem} order={index}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default SearchView;