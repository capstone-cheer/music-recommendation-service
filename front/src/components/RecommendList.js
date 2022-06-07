import React, { useState, useEffect, useContext } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import "../css/RecommendList.css";
import TrackCategory from "./TrackCategory";
import TrackInfo from "./TrackInfo";
import AppContext from "./AppContext";
import RecommendSettingPopup from "./RecommendSettingPopup";
import axios from "axios";

const categorySetting = [
    { 'id':'1', 'category_name' : 'cate1', 'isChecked': true },
    { 'id':'2', 'category_name' : 'cate2', 'isChecked': false },
    { 'id':'3', 'category_name' : 'cate3', 'isChecked': true },
    { 'id':'4', 'category_name' : 'cate4', 'isChecked': true },
]

function RecommendList(props) {
    const [recommendSettingOpen, setRecommendSettingOpen] = useState(false);
    const [songIdList, setSongIdList] = useState(null);
    const [recommendItems, setRecommendItems] = useState(null);

    const globalVar = useContext(AppContext);

    const makeSongIdList = () => {
        const tmpSongIdList = [];
        props.playlistItems && props.playlistItems.map((track, index) => {
            tmpSongIdList.push(track.id);
        })
        setSongIdList(tmpSongIdList);
    }
    

    const getPlaylistItems = async (value) => {
        makeSongIdList();
        console.log('fetch',value)
        await axios.post("/recommend/playlist", {
            songIdList: value,
            category : [
                "danceability",
                "tempo"
            ]
        }).then(function (res) {
            setRecommendItems(() => res.data);
            console.log(res.data)
        })
    }

    useEffect(() => {
        //getPlaylistItems(console.log(songIdList));
        console.log('songIdList', songIdList)
        console.log(globalVar.selectedPlaylist)
        getPlaylistItems(songIdList);
        
    }, [globalVar.selectedPlaylist]);


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
                    {recommendItems && recommendItems.map((track, index) => (
                        <TrackInfo track={track} order={index+1} />
                    ))}
                </div>    
            </div>

        </div>
    );
}
export default RecommendList;