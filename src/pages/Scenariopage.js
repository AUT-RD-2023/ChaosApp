import React, { useState, useRef } from 'react';
import { useLocation } from "react-router-dom";

import { scenario } from '../components/Scenarios.js';

// Components
import Button from '../components/Button.js'
import TextArea from '../components/TextArea.js'
import TimerBar from '../components/TimerBar.js'

// Styles
import style from '../styles/ScenarioPage.module.css';
import '../App.css';

function ScenarioPage() {
    const location = useLocation();
    const { state } = location;
    state.activity = "discussion";

    // Randomly generates an index num for scenario type & its scenario.
    const randType = useRef( Math.floor(Math.random() * 3) + 1 ).current;
    const randScenario = useRef( Math.floor(Math.random() * 2 )).current;
    
    // Finds scenario object by type.
    const scenarioObj = scenario.find(obj => {
        return obj.type === randType;
    });

    /* BUTTON */

    /*  when submit button is pressed
        - disable text input area [✓]
        - disable submit button [✓]
        - change text on submit button to checkmark [X]
        - store response in messages array using ably [X]
        - save response to database [X]
    */

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [textAreaDisabled, setTextAreaDisabled] = useState(false);

    const handleSubmit = () => {
        console.log("Submit button pressed.")
        setButtonDisabled(true);
        setTextAreaDisabled(true);
    }
        
    return(
        <div className="App">
            <div className="header">
                <div className="name"><strong>{ state.nickname }</strong></div>
                <div className="round">ROUND { state.round }/5</div>
            </div>
            <div className={style.timer}>
                <TimerBar timeLength="1200" path="/Bridge" state={ state }/>
            </div>
            <div className="content">
                <div className={style.container}>
                    <h1 className={style.heading}>SCENARIO</h1>
                    <p className={style.text}>{scenarioObj.scenarioArray[randScenario]}</p>
                    <p className={style.text}>What do you do?</p>
                    <TextArea 
                        placeholder="Enter Response..."
                        disabled={ textAreaDisabled }
                    />
                    <div style={{marginTop: "2vh"}}>
                        <Button 
                            name={ buttonDisabled ? "✓" : "SUBMIT"}
                            press={ handleSubmit }
                            disabled={ buttonDisabled } 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ScenarioPage;