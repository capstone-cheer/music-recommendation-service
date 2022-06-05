import React, {useState} from 'react';
import "../css/PlaylistAddPopup.css"

function PlaylistAddPopup(props) {
    const [inputPlaylistName, setInputPlaylistName] = useState('');
    const handleInputPlaylistName = (e) => {
        setInputPlaylistName(e.target.value);
    }
    const submitPlaylistName = () => {
        // fetch하고 창 닫기
        console.log(inputPlaylistName)
        props.close()
    }

    return (
        <div className={props.open ? 'open playlist__add__popup' : 'playlist__add__popup'}>
            {props.open ? (
                <section>
                <header>
                    Add Playlist
                    <button className="close" onClick={props.close}>
                        &times;
                    </button>
                </header>
                <main>
                    <div className="playlist__name__input">
                        <input id="id" 
                            type="text"
                            name="id" 
                            placeholder="플레이리스트의 이름을 입력하세요." 
                            value={inputPlaylistName} 
                            onChange={handleInputPlaylistName} 
                        />
                    </div>
                </main>
                <footer>
                    <button className='playlist__add__popup__submit__button'
                            onClick={submitPlaylistName}>
                        Submit
                    </button>
                    <button className="playlist__add__popup__close__button" onClick={props.close}>
                        Close
                    </button>
                </footer>
                </section>
            ) : null}
            </div>
    );
}
export default PlaylistAddPopup;