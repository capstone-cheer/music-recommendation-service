import React, { useState, useEffect, useContext } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import "../css/RecommendList.css";
import TrackCategory from "./TrackCategory";
import TrackInfo from "./TrackInfo";
import AppContext from "./AppContext";
import RecommendSettingPopup from "./RecommendSettingPopup";
import axios from "axios";

const playlist = {
    'id':'1',
    'name':'',
    'tracks': [
        {'id':'1', 'title':'title1', 'artist':'qasdf234we', 'album':'123'},
        {'id':'2', 'title':'asdqwr', 'artist':'qqwewe', 'album':'123'},
        {'id':'3', 'title':'asdasxcb', 'artist':'qwerwe', 'album':'123'},
        {'id':'4', 'title':'asqwzxd', 'artist':'qasdfwe', 'album':'123'},
        {'id':'5', 'title':'asfagrfhtgykd', 'artist':'asdfzxcqwe', 'album':'123'},
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
}

const categorySetting = [
    { 'id':'1', 'category_name' : 'cate1', 'isChecked': true },
    { 'id':'2', 'category_name' : 'cate2', 'isChecked': false },
    { 'id':'3', 'category_name' : 'cate3', 'isChecked': true },
    { 'id':'4', 'category_name' : 'cate4', 'isChecked': true },
]

function RecommendList(props) {
    const [recommendSettingOpen, setRecommendSettingOpen] = useState(false);
    const [recommendSources, setRecommendSources] = useState(null);
    const [songIdList, setSongIdList] = useState(null);
    const [recommendItems, setRecommendItems] = useState(null);

    const globalVar = useContext(AppContext);

    const tmpSongIdList = [];
    const getPlaylistItems = async () => {
        await axios.get("/playlists/"+sessionStorage.getItem('member_id')+"/"+ globalVar.selectedPlaylist.playlistId)
        .then(function (res) {
            setRecommendSources(res.data);
            res.data && res.data.map((track, index) => {
                tmpSongIdList.push(track.id);
                console.log(track.id);
            })
            setSongIdList(() => tmpSongIdList);
        })
    }
    

    /*
    const getRecommendItems = async () => {
        await axios.post("/recommend/playlist", {
            "songIdList":[],
            "category": [
                "danceability",
                "tempo"
            ]
        })
    }*/

    useEffect(() => {
        getPlaylistItems();
        console.log(songIdList)
    }, [])


    const openRecommendSetting = () => {
        // 추천 카테고리 설정 fetch
        setRecommendSettingOpen(true);
      };
    const closeRecommendSetting = () => {
        setRecommendSettingOpen(false);
    };

    return(
        <div className="recommend__list">
            <div className="recommend__title">
                RECOMMEND LIST
            </div>
            <div className="setting__button">
                <button onClick={openRecommendSetting}>
                    <IoSettingsOutline className="setting__icon" size='24' />
                </button>
            </div>
            <RecommendSettingPopup open={recommendSettingOpen} 
                                    close={closeRecommendSetting}
                                    categorySetting={categorySetting} />

            <div className="recommend__tracks">
                <div className="recommend__track__category">
                    <TrackCategory />
                </div>
                <div className="recommend__track__list">
                    {playlist.tracks && playlist.tracks.map((track, index) => (
                        <TrackInfo track={track} order={index+1} />
                    ))}
                </div>    
            </div>

        </div>
    );
}
export default RecommendList;