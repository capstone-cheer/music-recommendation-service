import './css/App.css';
import React, { useEffect, useState} from 'react';
import { Link, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Main from './components/Main';
import AppContext from './components/AppContext';

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  //전역변수
  const [ searchRequest, setSearchRequest ] = useState(null);
  const [ searchResponse, setSearchResponse ] = useState(null);
  const [ selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [ playingPlaylist, setPlayingPlaylist] = useState(null);
  const [ playingTrackList, setPlayingTrackList ] = useState(null);
  const [ recommendCategory, setRecommendCategory ] = useState(['tempo', 'danceability', 'acousticness', 'energe']);

  const changeSearchRequest = (value) => {
    setSearchRequest(value);
  }
  const changeSelectedPlaylist = (value) => {
    setSelectedPlaylist(value);
  }
  const changePlayingPlaylist = (value) => {
    setPlayingPlaylist(value);
  }
  const changePlayingTrackList = (value) => {
    setPlayingTrackList(value);
  }
  const changeSetSearchResponse = (value) => {
    setSearchResponse(value)
  }

  const changeRecommendCategory = (value) => {
    setRecommendCategory(value);
  }


  const globalVar = {
    searchRequest: searchRequest,
    searchResponse: searchResponse,
    selectedPlaylist: selectedPlaylist,
    playingPlaylist: playingPlaylist,
    playingTrackList: playingTrackList,
    recommendCategory: recommendCategory,
    changeSearchRequest,
    changeSelectedPlaylist,
    changePlayingPlaylist,
    changePlayingTrackList,
    changeSetSearchResponse,
    changeRecommendCategory
  }

  useEffect(() => {
    if(sessionStorage.getItem('member_id') === null){
      console.log('isLoggedIn? -> ', isLoggedIn)
    } else {
      setIsLoggedIn(true)
      console.log('isLoggedIn? -> ', isLoggedIn)
    }
  }, []);


  return (
    <AppContext.Provider value={globalVar}>
      <div className="App">
        {isLoggedIn ? // 로그인 세션 확인하고 화면 렌더링 
          <Routes>
              <Route path="/" element={<Main isLoggedin={isLoggedIn} />}></Route>
              <Route path="/callback" element={<Main isLoggedin={isLoggedIn} />} ></Route>
          </Routes> :
          <Login />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
