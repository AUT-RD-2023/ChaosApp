// React
import React from 'react';

// Styles
import style from '../styles/EndPage.module.css';

// Images
import img from '../styles/images/celebration.svg';
import { ReactComponent as Next } from '../styles/images/endscreen-arrow.svg';

import { useNavigate } from "react-router-dom";

function CelebrationPage() {

    const navigate = useNavigate();

    return (
        <>
            <Next className={style.next} onClick={() => navigate('/Recap')}/>
            <div className={style.celebration_page}>
                <div className={style.container}>
                    <div className={style.subtitle}>THANKS FOR PLAYING!</div>
                    <div className={style.image_wrapper}>
                        <img src={img} alt="alt" className={style.image} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CelebrationPage;