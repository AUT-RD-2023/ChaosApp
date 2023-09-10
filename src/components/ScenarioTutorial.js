// React
import React from 'react';

// Style
import style from '../styles/Tutorial.module.css';
function ScenarioTutorial(){
    return(
        <div className={style.page}>
            <div className={style.image} />
            <p className={style.title}>SCENARIO</p>
            <p className={style.text}>During the scenario stage, a chaotic situation will be presented to you, think how you would react and write a response in the input box.
                <br /><br />In later rounds, additional chaos will be added to the scenario.</p>
        </div>
    )
}

export default ScenarioTutorial;