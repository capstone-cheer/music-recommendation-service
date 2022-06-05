import React, { useState, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import "../css/Header.css";
import LoginStatus from "./LoginStatus";
import AppContext from "./AppContext";

// Main > Header
function Header(props) {
    const [inputSearch, setInputSearch] = useState('');

    const globalVar = useContext(AppContext);

    const handleInputSearch = (e) => {
        setInputSearch(e.target.value);
    }

    const submit = (inputSearch) => {
        // 검색결과 fetch하고 container의 내용을 검색결과에 대한 내용으로 새로 렌더링해줘야함
        // => main으로 보내고, main에서는 다시 body -> container로 전달
        if (inputSearch !== ''){
            globalVar.changeSearchRequest(inputSearch);
            globalVar.changeSelectedPlaylist(null);
            setInputSearch('');
        }
    }

    return (
        <div className="header">
            <div className="search">
                <div className="search__icon">
                    <IoSearch size='24' color="white"/>
                </div>

                <div className="search__input">
                    <input id="id" 
                        type="text"
                        name="id" 
                        placeholder="검색할 제목을 입력하세요." 
                        value={inputSearch} 
                        onChange={handleInputSearch} 
                    />
                </div>

                <div className="search__submit__button">
                    <button onClick={ () => {
                        submit(inputSearch);
                    }}>
                        <IoSearch size='24' color="white"/>
                    </button>
                </div>
            </div>

            <div>
                <LoginStatus />
            </div>
        </div>
    );
}
export default Header;