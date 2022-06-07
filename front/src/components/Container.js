import React, { useState, useEffect, useContext } from "react";
import "../css/Container.css";
import CategoryRow from "./CategoryRow";
import RecommendList from "./RecommendList";
import TrackContainer from "./TrackContainer";
import AppContext from "./AppContext";
import SearchView from "./SearchView";

// Body > Container
function Container(props){
    console.log('Container Render');
    const globalVar = useContext(AppContext);
    
    const categories = [
        {'id' : '1', 'name' : 'category1', 'playlists' : props.playlists},
        {'id' : '2', 'name' : 'category2', 'playlists' : props.playlists},
        {'id' : '3', 'name' : 'category3', 'playlists' : props.playlists},
        {'id' : '4', 'name' : 'category4', 'playlists' : props.playlists},
        {'id' : '5', 'name' : 'category5', 'playlists' : props.playlists},
    ]

    // 선택된 플레이리스트가 없으면 category화된 플레이리스트 fetch
    if (props.selectedPlaylist === null) {

    }

    else {

    }

    // 선택된 플레이리스트가 있으면 해당 플레이리스트에 대한 정보 fetch

    return (
        <div className="container">
            {globalVar.searchRequest !== null ? (
                <SearchView searchRequest={globalVar.searchRequest}/>
            ):(globalVar.selectedPlaylist !== null ?(
                <div className="select__container">
                    <TrackContainer />
                    <RecommendList />
                </div>
            ):(
                <div className="category__container">
                    {categories && categories.map((category, index) => (
                        <div className="category__belt">
                            <div className="category__name">{category.name}</div>
                            <CategoryRow playlists={category.playlists} />
                            <hr />
                        </div>
                    ))}
                </div>
            ))}

        </div>
    );
}
export default Container;
