import React, { useState, useEffect, useContext } from "react";
import "../css/SearchView.css";
import AppContext from "./AppContext";

function SearchView(props) {
    const globalVar = useContext(AppContext);

    // 검색 요청을 서버에 fetch한 결과를 렌더링

    return (
        <div className="search__view">
            {globalVar.searchRequest}
        </div>
    );
}
export default SearchView;