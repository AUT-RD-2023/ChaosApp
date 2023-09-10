// React
import React from 'react';

// Styles
import style from '../styles/Tutorial.module.css';

function WelcomeTutorial(){
    return(
        <div className={style.page}>
            <div className={style.welcome}>
                <p className={style.title}>WELCOME</p>
                <p className={style.text}><br />Kia Rite or be prepared is...<br/><br/>
                    The aim of Kia Rite is to identify hazards in the work place by generating chaotic scenarios and encouraging a discussion with the users. In the home screen players can either host a new session or join a current one. </p>
            </div>
        </div>
    )
}

export default WelcomeTutorial;