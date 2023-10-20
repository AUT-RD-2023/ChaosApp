
// React
import React from 'react';

// Style
import style from '../styles/Tutorial.module.css';

// Images
import img from '../styles/images/scenario.png';

function ScenarioTutorial(){
    return(
        <div className={style.page}>
            <div className={style.image_wrapper}>
                <img src={img} alt="alt" className={style.image} />
            </div>
            <p className={style.title}>SCENARIO</p>
            <p className={style.text}>
                In the scenario phase, you'll be presented with a potentially hazardous incident. Think about how you would respond and submit that as your answer.
            <br /><br />
                As the game progresses, later rounds will introduce additional chaos to the scenario, and see how your response changes to adapt to the situation.</p>
        </div>
    )
}

export default ScenarioTutorial;