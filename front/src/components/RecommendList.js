import React, { useState, useEffect, useContext } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import "../css/RecommendList.css";
import TrackCategory from "./TrackCategory";
import TrackInfo from "./TrackInfo";
import AppContext from "./AppContext";
import RecommendSettingPopup from "./RecommendSettingPopup";
import axios from "axios";

function RecommendList(props) {
    const [recommendSettingOpen, setRecommendSettingOpen] = useState(false);
    const [songIdList, setSongIdList] = useState(null);
    const [recommendItems, setRecommendItems] = useState(null);
    const [recommendSetting, setRecommendSetting] = useState(null);
    const globalVar = useContext(AppContext);

    console.log('props', props.playlistItems);

    const makeSongIdList = () => {
        const tmpSongIdList = [];
        props.playlistItems && props.playlistItems.map((track, index) => {
            tmpSongIdList.push(track.id);
        })
        setSongIdList(tmpSongIdList);
    }

    const fetchRecommendByList = async () => {
        if (globalVar.searchRequest===null){
            await axios.post("/recommend/playlist", {
                songIdList: songIdList,
                category : globalVar.recommendCategory,
            }).then(function (res) {
                setRecommendItems(res.data);
                console.log(res.data)
            })
        }
    }

    const fetchRecommendByItem = async () => {
        await axios.post("/recommend/song", {
            songId: globalVar.recommendSource,
            category : globalVar.recommendCategory,
        }).then(function (res) {
            setRecommendItems(res.data);
            console.log(res.data)
        })
    }
    
    useEffect(() => {
        if(globalVar.searchRequest === null && songIdList !== null) {
            fetchRecommendByList();
        }
    },[globalVar.recommendCategory]);

    useEffect(() => {
        if(globalVar.searchRequest === null && songIdList !== null){
            fetchRecommendByList();
        }
    },[songIdList])

    useEffect(() => {
        if(globalVar.searchRequest === null && props.playlistItems !== null){
            makeSongIdList();
        }
    }, [props.playlistItems])

    useEffect(() => {
        if(globalVar.recommendSource !== null) {
            fetchRecommendByItem();
        }
    }, [globalVar.recommendSource, globalVar.recommendCategory])


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
                                    />

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