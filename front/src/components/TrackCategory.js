import React, { useState, useEffect } from "react";
import '../css/TrackCategory.css'

function TrackCategory() {
    return (
        <div className="track__category__belt">
            <div className="track__category__order">#</div>
            <div className="track__category__cover__blank">&nbsp;</div>
            <div className="track__category">
                <div className="track__category__title">TITLE</div>
                <div className="track__category__artist">ARTIST</div>
            </div>
        </div>
    );
}
export default TrackCategory;