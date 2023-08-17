import React from 'react';

import {scenario} from '../components/Scenarios.js';

// Components
import Button from '../components/Button.js'
import Textarea from '../components/Textarea.js'
import TimerBar from '../components/TimerBar.js'

// Styles
import style from '../styles/ScenarioPage.module.css';
import '../App.css';

function ScenarioPage() {

    // Randomly generates an index num for scenario type & its scenario.
    const randType = Math.floor(Math.random()*3)+1;
    const randScenario = Math.floor(Math.random()*2);
    
    // Finds scenario object by type.
    const scenarioObj = scenario.find(obj => {
        return obj.type === randType;
    });
        
        return(
            <div className="App">
                <div className="header">
                    <div className="name">NAME</div>
                    <div className="round">ROUND X/X</div>
                </div>
                <div className={style.timer}>
                    <TimerBar timeLength="30"/>
                </div>
                <div className="content">
                    <div className={style.container}>
                        <h1 className={style.heading}>SCENARIO</h1>
                        <p className={style.text}>{scenarioObj.scenarioArray[randScenario]}</p>
                        <p className={style.text}>What do you do?</p>
                        <Textarea placeholder="Enter Response..."/>
                        <div style={{marginTop: "2vh"}}>
                            <Button name = "SUBMIT"/>
                        </div>
                    </div>
                </div>
            </div>
        );
}
export default ScenarioPage;