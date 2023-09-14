// React
import React, { useState, useEffect } from 'react';
import { useChannel } from "@ably-labs/react-hooks";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setActivity, setScenario } from '../Redux/sessionSlice.js';

// Database
import { ref, set, onValue } from "firebase/database";
import { database } from '../database.js';

// Variables
import { scenario } from '../components/Scenarios.js';

// Components
import Button from '../components/Button.js'
import Textarea from '../components/Textarea.js'
import TimerBar from '../components/TimerBar.js'
import Header from '../components/Header.js'
import HowToPlay from '../components/HowToPlay'
import ShowMoreText from "react-show-more-text";

// Styles
import styles from '../styles/ScenarioPage.module.css';
import '../App.css';

function ScenarioPage() {
    /* REDUX */

    const gamePin = useSelector((state) => state.session.gamePin);
    const round = useSelector((state) => state.session.round);      
    const isHost = useSelector((state) => state.session.isHost);
    const playerId = useSelector((state) => state.session.playerId);  

    const customScenario = useSelector((state) => state.session.customScenario);
    const useCustomScenario = useSelector((state) => state.session.useCustomScenario);

    const dispatch = useDispatch();

    /* SCENARIO */
    
    const [textVisible, setTextVisible] = useState(false);
    const [scenarioText, setScenarioText] = useState("");

    useEffect(() => {
        if(isHost) {
            // Randomly generates an index num for scenario type & its scenario.
            const randType = Math.floor(Math.random() * 3) + 1;
            const randScenario = Math.floor(Math.random() * 2 );         

            // Finds scenario object by type.
            const scenarioObj = scenario.find(obj => { 
                return obj.type === randType;
            });

            channel.publish("Set Scenario", { text: useCustomScenario ? customScenario : scenarioObj.scenarioArray[randScenario] }); 
        }       
        // Set up next activity for all players        
        dispatch(setActivity("discussion")) // eslint-disable-next-line
    }, []);

    /* ABLY */

    const [channel] = useChannel(gamePin + "", (message) => {
        if(message.name === "Set Scenario") {      
            setScenarioText(message.data.text);
            dispatch(setScenario(message.data.text));
            console.log("Message recieved from channel.");
        }
    }); 

    // set the scenario text to visible once the value has been initialised (forcing a re-render)
    useEffect(() => {
        setTextVisible(true);
        console.log("Second useEffect has been triggered.");
    }, [scenarioText]);

    /* BUTTON */

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [textAreaDisabled, setTextAreaDisabled] = useState(false);

    const handleSubmit = () => {
        setButtonDisabled(true);
        setTextAreaDisabled(true);

        updateDatabase();
    }   

    /* DATABASE */
    
    const [message, setMessage] = useState('');

    const updateDatabase = () => {
        set(ref(database, `lobby-${gamePin}/responses/round-${round}/${playerId}`), {
            response: message // Add the users message to the database while tracking the current round and the users id
        }); 
    }

    // eslint-disable-next-line
    const [responseTime, setResponseTime] = useState();

    const responseTimeData = ref(database, 'lobby-' + gamePin + '/responseTime');

    useEffect(() => {
        onValue(responseTimeData, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                setResponseTime(data);
            }
        });
    }, [responseTimeData]);
        
    /* RENDER */

    return(
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.subheader}>
                    <Header />
                </div>
                <TimerBar timeLength= {10}/*{ responseTime }*/ addTime="0" path="/Bridge" />
                <HowToPlay />
            </div>
            <div className={styles.content}>
                <div className={styles.buttons}>
                    <Button
                        name= { buttonDisabled ? "✓" : "SUBMIT"}
                        static={ false }
                        press={ handleSubmit}
                        disabled={ buttonDisabled }/>
                </div>
                <div className={styles.container}>
                    <div className={styles.subtitle}>SCENARIO</div>
                    <div className={styles.prompt}>{ textVisible ? scenarioText : "" }</div>
                    {/*<ShowMoreText*/}
                    {/*    lines={1}*/}
                    {/*    more={<span className={styles['show-more-link']}><br/>show more</span>}*/}
                    {/*    less={<span className={styles['show-more-link']}><br/>show less</span>}*/}
                    {/*>*/}
                    {/*    <span className={styles['show-more-text']}>{scenarioText}</span>*/}
                    {/*</ShowMoreText>*/}
                    {/*<div className={styles.prompt}>{scenarioText}</div>*/}
                    <div className={styles.prompt}>What do you do...?</div>
                    <Textarea
                        placeholder="Enter Response..."
                        disabled ={ textAreaDisabled }
                        onChange={(e) => setMessage(e.target.value)}
                        popUp={ false }
                    />
                </div>
            </div>
        </div>
    );
}

export default ScenarioPage;