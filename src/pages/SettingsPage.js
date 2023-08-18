import '../components/Settings.css';
import Setter from '../components/Setter';
import '../App.css';
import Button from '../components/Button.js';
import React, { useState } from 'react';


function SettingsPage(props) {
    const [round, setRound] = useState(5);
    const [discussTimer, setDiscussTimer] = useState(30);
    const [responseTimer, setResponseTimer] = useState(30);
    const [votingTimer, setVotingTimer] = useState(30);
 


return  (
    <div className="settings">
        <h1 className="header">SETTINGS</h1>
        <div>
            {/* {original} is the default value for each setting */}
            {/* {value} is the increment/decrement value of the buttons for each setting */}
            <div className="number-of-rounds">
                <h3 className= "subtitle">Number of rounds</h3>
                <Setter original={round} value={1} setTimer={setRound} />               
            </div>
            <div className="divider"></div>
            <div className="response-timer">
                <h3 className= "subtitle">Response Timer (+30sec)</h3>
                <Setter original={responseTimer} value={30} setTimer={setResponseTimer} />               
            </div>
            <div className="divider"></div>
            <div className="discussion-timer">
                <h3 className= "subtitle">Discussion Timer (+30sec)</h3>
                <Setter original={discussTimer} value={30} setTimer={setDiscussTimer} />               
            </div>
            <div className="divider"></div>
            <div className="voting-timer">
                <h3 className= "subtitle">Voting Timer (+30sec)</h3>
                <Setter original={votingTimer} value={30} setTimer={setVotingTimer} />               
            </div>
            <div className="divider"></div>
            <div className="settings-btns"><Button name="SAVE" press={() => {
                console.log("Saved round: " + round);
                props.setTrigger(false);
            }}/></div>  
            <div className="settings-btns"><Button name="CANCEL" press={() => props.setTrigger(false)}/></div>  
        </div>
    </div>
    

)

}

export default SettingsPage