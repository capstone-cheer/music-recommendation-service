import React, { useState, useEffect, useContext } from "react";
import "../css/SearchView.css";
import AppContext from "./AppContext";
import { IoAddCircle, IoPlayCircle } from "react-icons/io5"

const tracks = [
    {'id':'1', 'title':'title1', 'artist':'qasdf234we', 'album':'123'},
    {'id':'2', 'title':'asdqwr', 'artist':'qqwewe', 'album':'123'},
    {'id':'3', 'title':'asdasxcb', 'artist':'qwerwe', 'album':'123'},
    {'id':'4', 'title':'asqwzxd', 'artist':'qasdfwe', 'album':'123'},
    {'id':'5', 'title':'asfagasdasdasd', 'artist':'asdfzxcqwe', 'album':'123'},
    {'id':'6', 'title':'asert2d', 'artist':'qwetwewe', 'album':'123'},
    {'id':'7', 'title':'werwerasd', 'artist':'qxcvnswe', 'album':'123'},
    {'id':'8', 'title':'xcvbasd', 'artist':'qwdfgjde', 'album':'123'},
    {'id':'9', 'title':'asdghasd', 'artist':'qertewwe', 'album':'123'},
    {'id':'10', 'title':'qweasdasd', 'artist':'sdfgsqwe', 'album':'123'},
    {'id':'11', 'title':'asgdxcbasd', 'artist':'qsdfhcvwe', 'album':'123'},
    {'id':'12', 'title':'dafydryasd', 'artist':'qxcvbwwe', 'album':'123'},
    {'id':'13', 'title':'xcvbasd', 'artist':'qweasfqwe', 'album':'123'},
    {'id':'14', 'title':'werqasd', 'artist':'ngdfqwe', 'album':'123'},
]

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
    const [isMouseOver, setIsMouseOver] = useState(0);
    const submitTrackToPlay = (value) => {
        console.log(value);
    }

    const addTrackToPlaylist = () => {
        // 선택한 트랙을 현재 재생 중인 플레이리스트에 추가
        console.log(props.track.title)
        // 재생중인 플레이리스트가 없으면 오류 출력
    }

    // 35 25 20 5
    return (
        <div className="search__result__track" onMouseOver={ () => setIsMouseOver(1)}
                                                onMouseOut={ () => setIsMouseOver(0)}>
            <div className="search__result__track__title">
                {isMouseOver ?
                    <div className="search__result__track__play__button">
                        <button onClick={ () => {
                            submitTrackToPlay(props.track.id)
                        }}>
                            <IoPlayCircle className="search__result__track__play__circle" size='50' color="#1db954" />
                        </button>
                    </div>
                    : <img src="https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1" 
                            className="search__result__track__cover" 
                            alt="cover"
                />
                }

                <p>{props.track.title}</p>
            </div>
            <div className="search__result__track__album">
                <p>{props.track.album}</p>
            </div>
            <div className="search__result__track__artist">
                <p>{props.track.artist}</p>
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
    console.log(globalVar.searchRequest);

    // 검색 요청을 서버에 fetch한 뒤 결과를 렌더링

    // 검색결과 n개 출력하고 트랙 리스트 출력해주기
    return (
        <div className="search__view">
            <div className="search__result__num">
                {tracks.length + '개의 검색 결과'}
            </div>
            <SearchResultCategory />
            <ul>
                {tracks && tracks.map((track, index) => (
                    <li key={index}>
                        <SearchResultTrack track={track} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default SearchView;