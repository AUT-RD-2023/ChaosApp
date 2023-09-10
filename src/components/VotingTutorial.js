// React
import React from 'react';

// Styles
import style from '../styles/Tutorial.module.css';

function VotingTutorial(){
    return(
        <div className={style.page}>
            <div className={style.image} />
            <p className={style.title}>VOTING</p>
            <p className={style.text}>During the voting stage, players can select the response they felt was the best. The responses that get the most votes will be highlighted.</p>
        </div>
    )
}

export default VotingTutorial;