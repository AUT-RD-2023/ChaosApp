// React
import React from 'react';

// Styles
import style from '../styles/Tutorial.module.css';

function DiscussionTutorial(){
    return(
        <div className={style.page}>
            <div className={style.image} />
            <p className={style.title}>DISCUSSION</p>
            <p className={style.text}> During the discussion stage, each player response is discussed by the group. The host is able to add more time for discussion as well as skip similar responses.</p>
        </div>
    )
}

export default DiscussionTutorial;