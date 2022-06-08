import React, {useState, useContext} from 'react';
import AppContext from "./AppContext";
import '../css/RecommendSettingPopup.css';

function CategoryLable(props) {
    const [isChecked, setIsChecked] = useState(false);

    const checkedHandler = ({ target }) => {
        setIsChecked(!isChecked);
        props.checkedCategoryHandler(props.category, target.checked);
    }

    return (
        <div className='category__label'>
            <input type="checkbox" 
                    name="category" 
                    value={props.category}
                    onChange={ e => {
                        checkedHandler(e);
                    }}
            />
            {props.category}
        </div>
    );
}

function RecommendSettingPopup(props){
    const globalVar = useContext(AppContext);
    const [checkedCategory, setCheckedCategory] = useState(new Set());
    const categoryList = ['tempo', 'danceability', 'acousticness', 'energe'];

    const checkedCategoryHandler = (id, isChecked) => {
        if(isChecked) {
            checkedCategory.add(id);
            setCheckedCategory(checkedCategory);
            console.log(checkedCategory)
        }
        else if (!isChecked && checkedCategory.has(id)) {
            checkedCategory.delete(id);
            setCheckedCategory(checkedCategory);
            console.log(checkedCategory)
        }
    }
    
    const submitRecommendSetting = () => {
        if (checkedCategory.size > 0) {
            const tmpArr = [...checkedCategory]
            globalVar.changeRecommendCategory(tmpArr)
            
            setCheckedCategory(new Set());
            props.close();
        }
        else {
            alert('카테고리를 선택해주세요.')
        }
    }

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
                        {categoryList && categoryList.map((category, index) => (
                            <CategoryLable category={category} checkedCategoryHandler={checkedCategoryHandler}/>
                        ))}
                    </ul>
                </main>
                <footer>
                    <button className='recommend__setting__popup__submit__button'
                            onClick={submitRecommendSetting}>
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