// React
import React from 'react';

// Styles
import style from '../styles/Tutorial.module.css';

// Images
import img from '../styles/images/discussion.png';

function DiscussionTutorial(){
    return(
        <div className={style.page}>
            <div className={style.image_wrapper}>
            <img src={img} alt="alt" className={style.image} />
            </div>
            <p className={style.title}>DISCUSSION</p>
            <p className={style.text}> During the discussion phase,
                each player's response is read out and the group consider whether it leads to a good outcome or has unintended consequences.
                <br /><br />
                The host can add more time for discussion or skip similar responses.</p>
        </div>
    )
}

export default DiscussionTutorial;