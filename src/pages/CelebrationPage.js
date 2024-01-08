// React
import React from 'react';

// Styles
import style from '../styles/EndPage.module.css';

// Images
import img from '../styles/images/celebration.svg';
import { ReactComponent as Next } from '../styles/images/endscreen-arrow.svg';
import BurntLogo from "../styles/images/FinalBurntLogo.png";

import { useNavigate } from "react-router-dom";
import styles from "../styles/EndPage.module.css";
import Title from "../styles/images/EndScreenTitle.png";

function CelebrationPage() {

    const navigate = useNavigate();

    return (
        <div className={style.celebration_page}>
            <Next className={style.next} onClick={() => navigate('/Recap')}/>
            <div className={style.container}>
                <img className={styles.logo} src={ BurntLogo } alt="Burnt Logo" />
                <div className={style.image_wrapper}>
                    <img src={img} alt="cone" className={style.image}/>
                    <div className={style.subtitle_celebration}>THANKS FOR PLAYING!</div>
                </div>
            </div>
        </div>
    )
}

export default CelebrationPage;