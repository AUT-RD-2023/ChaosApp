import React from 'react';

import {scenario} from '../components/Scenarios.js';

// Components
import Button from '../components/Button.js'
import Input from '../components/Input.js'
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
                    <div className="round">ROUND</div>
                </div>
                <TimerBar timeLength="10"/>
                <div>
                    <br/><br/>
                    <h1>Scenario</h1>
                    <p>{scenarioObj.scenarioArray[randScenario]}</p>
                    <p>What do you do?</p>
                    <Input placeholder="Enter Response"/>
                    <Button name = "SUBMIT"/>
                </div>
            </div>

        );
}
export default ScenarioPage;