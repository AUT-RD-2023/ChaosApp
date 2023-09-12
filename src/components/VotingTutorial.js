// React
import React from 'react';

// Styles
import style from '../styles/Tutorial.module.css';

// Images
import img from '../styles/images/voting.png';

function VotingTutorial(){
    return(
        <div className={style.page}>
            <div className={style.image_wrapper}>
                <img src={img} alt="alt" className={style.image} />
            </div>
            <p className={style.title}>VOTING</p>
            <p className={style.text}>During the voting phase, you can select the response that you found the most valuable for preparing you in your workplace.
            <br /><br />The number of votes each response receives is then displayed, and the submission with the most votes is highlighted.</p>
        </div>
    )
}

export default VotingTutorial;