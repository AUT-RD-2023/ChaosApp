// React
import React from 'react';

// Styles
import style from '../styles/EndPage.module.css';
import appStyle from '../App.css';

// Images
import img from '../styles/images/celebration.svg';

function Celebration() {
    return (        
        <div className={style.page}>
            <div className={style.container}>        
                <div className={style.subtitle}>THANKS FOR PLAYING!</div>
                <img src={img} alt="alt" className={style.image}/>
            </div>
        </div>
    )
}

export default Celebration;