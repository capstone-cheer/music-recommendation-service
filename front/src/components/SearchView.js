import React, { useState, useEffect, useContext } from "react";
import "../css/SearchView.css";
import AppContext from "./AppContext";
import { IoAddCircle, IoPlayCircle } from "react-icons/io5"
import axios from "axios"

function SearchResultCategory() {
    return(
        <div className="search__result__category">
            <div className="search__result__category__title">
                <p>TITLE</p>
            </div>
            <div className="search__result__category__artist">
                <p>ARTIST</p>
            </div>
            <div className="search__result__category__blank">
                &nbsp;
            </div>
        </div>
    );
};

function SearchResultTrack(props) {
    const globalVar = useContext(AppContext);
    const [isMouseOver, setIsMouseOver] = useState(0);

    const submitTrackToPlay = (value) => {
        console.log("추천해줘", value.track.id)
        globalVar.changeRecommendSource(value.track.id)
        props.submitTrackFromItem(value.order);
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

    return (
        <div className="search__result__track" onMouseOver={ () => setIsMouseOver(1)}
                                                onMouseOut={ () => setIsMouseOver(0)}>
            
            <div className="search__result__track__detail">
                <div className="search__result__album__title__box">
                    <div className="search__result__track__cover">
                        {isMouseOver ?
                            <div className="search__result__track__play__button">
                                <button onClick={ () => {
                                    submitTrackToPlay(props)
                                }}>
                                    <IoPlayCircle className="search__result__track__play__circle" size='50' color="#1db954" />
                                </button>
                            </div>
                            :   <img src={props.track.imageUrl} 
                                    className="search__result__track__cover__img" 
                                    alt="cover"
                                />
                        }
                    </div>
                    <div className="search__result__album__title">
                        <div className="search__result__track__title">
                            {props.track.name}
                        </div>
                        <div className="search__result__track__album">
                            {props.track.albumName}
                        </div>
                    </div>
                </div>
                <div className="search__result__track__artist">
                    {props.track.artistName}
                </div>
                <div className="search__result__track__add">
                    <button onClick={ () => {
                        addTrackToPlaylist();
                    }}>
                        <IoAddCircle size={30} color={'green'}/>
                    </button>
                </div>
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
            <div className="search__result__ul">
                <ul>
                    {searchViewTrack && searchViewTrack.map((track, index) => (
                        <li key={index}>
                            <SearchResultTrack track={track} submitTrackFromItem={submitTrackFromItem} order={index}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default SearchView;