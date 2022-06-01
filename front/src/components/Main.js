import React, { useState, useEffect } from "react";
import Header from "./Header";
import Body from "./Body";
import Player from "./Player";

// App > Main
function Main(){
    return (
        <div>
            <Header />
            <Body />
            <Player />
        </div>
    );
}
export default Main;