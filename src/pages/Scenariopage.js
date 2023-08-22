// React
import React, { useState, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { useChannel } from "@ably-labs/react-hooks";

// Database
import { ref, set } from "firebase/database";
import { database } from '../database.js';

// Variables
import { scenario } from '../components/Scenarios.js';

// Components
import Button from '../components/Button.js'
import TextArea from '../components/Textarea.js'
import TimerBar from '../components/TimerBar.js'

// Styles
import style from '../styles/ScenarioPage.module.css';
import '../App.css';

function ScenarioPage() {
    const location = useLocation();
    const gamePin = useSelector((state) => state.session.gamePin)
    const identity = useSelector((state) => state.session.identity)

    const { state } = location;
    state.activity = "discussion";

    /* SCENARIO */

    // Randomly generates an index num for scenario type & its scenario.
    const randType = useRef( Math.floor(Math.random() * 3) + 1 ).current;
    const randScenario = useRef( Math.floor(Math.random() * 2 )).current;
    
    // Finds scenario object by type.
    const scenarioObj = scenario.find(obj => {
        return obj.type === randType;
    });

    /* BUTTON */

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [textAreaDisabled, setTextAreaDisabled] = useState(false);

    const handleSubmit = () => {
        setButtonDisabled(true);
        setTextAreaDisabled(true);
        
        sendMessage();
        updateDatabase();
    }

    /* ABLY */

    const [message, setMessage] = useState('');
    const [messages, updateMessages] = useState([]);

    // Receive and send messages from Ably
    const [channel] = useChannel(gamePin, (message) => {
        updateMessages((prev) => [...prev, message]);
    });

    const sendMessage = () => {
        if (channel && message.trim() !== '') {
            channel.publish("Response", { text: state.nickname + ": " + message });
        }
    };

    const messagePreviews = messages.map((msg, index) => <li key={index}>{msg.data.text}</li>);

    /* DATABASE */

    /* const timerData = ref(database, 'lobby-' + gamePin + '/scenarioTimer');
    const [responseTimer, setResponseTimer] = useState(30);
   
    //Retrieve timer data from database and set it to discussTimer
    useEffect(() => {
        onValue(timerData, (snapshot) => {
            setResponseTimer(snapshot.val());
        }); console.log('Timer data:' + {responseTimer})
    },[]);*/
    
    const updateDatabase = () => {
        set(ref(database, 'lobby-' + state.gamePin + '/responses/round-' + state.round + "/" + state.id), {
        response: message // Add the users message to the database while tracking the current round and the users id
        }); 
    } 
        
    /* RENDER */

    return(
        <div className="App">
            <div className="header">
                <div className="name"><strong>{ identity.nickname }</strong></div>
                <div className="round">ROUND { state.round }/5</div>
            </div>

            <div className={style.timer}>
                <TimerBar timeLength={30} path="/Bridge"/>
            </div>

            <div className="content">
                <div className={style.container}>
                    <h1 className={style.heading}>SCENARIO</h1>
                    <p className={style.text}>{scenarioObj.scenarioArray[randScenario]}</p>
                    <p className={style.text}>What do you do?</p>
                    <TextArea 
                        placeholder="Enter Response..."
                        disabled={ textAreaDisabled }
                        onChange={(e) => setMessage(e.target.value)}
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

            { true ? "" : <span>  <h2>Responses</h2><ul>{messagePreviews}</ul> </span> /* Placeholder responses view */ }
        </div>
    );
}
export default ScenarioPage;