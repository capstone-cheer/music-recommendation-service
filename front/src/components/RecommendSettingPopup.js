import React, {useState} from 'react';
import '../css/RecommendSettingPopup.css';



function RecommendSettingPopup(props){
    return (
        <div className={props.open ? 'open recommend__setting__popup' : 'recommend__setting__popup'}>
            {props.open ? (
                <section>
                <header>
                    Recommend Setting
                    <button className="close" onClick={props.close}>
                        &times;
                    </button>
                </header>
                <main>
                    <ul className='category__list__table'>
                        {props.categorySetting && props.categorySetting.map((category, index) => (
                            <div className='category__label'>
                                <input type="checkbox" 
                                        name="category" 
                                        value={category.category_name}
                                        onChange={ e => {
                                            //checkEvent(index, e.target.value, e.target.checked);
                                            console.log('click')
                                        }}
                                />
                                {category.category_name}
                            </div>
                        ))}
                    </ul>
                </main>
                <footer>
                    <button className='recommend__setting__popup__submit__button'>
                        Submit
                    </button>
                    <button className="recommend__setting__popup__close__button" onClick={props.close}>
                        Close
                    </button>
                </footer>
                </section>
            ) : null}
            </div>
    );
};
export default RecommendSettingPopup;