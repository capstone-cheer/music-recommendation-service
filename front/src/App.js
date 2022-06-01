import './css/App.css';
import React, { useEffect, useState} from 'react';
import Login from './components/Login';
import Main from './components/Main';
import AppContext from './components/AppContext';

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ searchRequest, setSearchRequest ] = useState(null);
  const [ selectedPlaylist, setSelectedPlaylist] = useState(null);

  const changeSearchRequest = (value) => {
    setSearchRequest(value);
  }

  const changeSelectedPlaylist = (value) => {
    setSelectedPlaylist(value);
  }

  const globalVar = {
    searchRequest: searchRequest,
    selectedPlaylist: selectedPlaylist,
    changeSearchRequest,
    changeSelectedPlaylist,
  }

  useEffect(() => {
    if(sessionStorage.getItem('user_id') === null){
      console.log('isLoggedIn? -> ', isLoggedIn)
    } else {
      setIsLoggedIn(true)
      console.log('isLoggedIn? -> ', isLoggedIn)
    }
  })


  return (
    <AppContext.Provider value={globalVar}>
      <div className="App">
        {isLoggedIn ? // 로그인 세션 확인하고 화면 렌더링 
          <Main isLoggedin={isLoggedIn} /> :
          <Login />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
