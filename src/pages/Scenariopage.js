// React
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChannel } from "@ably-labs/react-hooks";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setActivity, setScenario } from '../Redux/sessionSlice.js';

// Database
import { ref, set, update, onValue } from "firebase/database";
import { database } from '../database.js';

// Variables
import { scenario } from '../components/Scenarios.js';

// Components
import Button from '../components/Button.js'
import Textarea from '../components/Textarea.js'
import TimerBar from '../components/TimerBar.js'
import Header from '../components/Header.js'
import HowToPlay from '../components/HowToPlay'


// Styles
import styles from '../styles/ScenarioPage.module.css';
import '../App.css';

function ScenarioPage() {
    const navigate = useNavigate();

    const gamePin = useSelector((state) => state.session.gamePin);
    const round = useSelector((state) => state.session.round);
    const playerId = useSelector((state) => state.session.playerId);        
    const isHost = useSelector((state) => state.session.isHost);
    const numPlayers = useSelector((state) => state.session.ablyUsers);

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

            // 
            update(ref(database, `lobby-${gamePin}/`), {
                scenario: (useCustomScenario ? customScenario : scenarioObj.scenarioArray[randScenario])
            });  
        }
        // Set up next activity for all players        
        dispatch(setActivity("discussion")) // eslint-disable-next-line
    }, []);

    if(scenarioText === "") {
        const responseData = ref(database, `lobby-${gamePin}/scenario`);

        onValue(responseData, (snapshot) => {
            if(snapshot.exists()) {                
                setScenarioText(snapshot.val());
                dispatch(setScenario(snapshot.val()));            
            }          
        });
    }

    /* ABLY */

    const [channel] = useChannel(gamePin + "", (message) => {
        if (message.name === "Next Page") {
            navigate("/Bridge");
        }
    }); 

    // set the scenario text to visible once the value has been initialised (forcing a re-render)
    useEffect(() => {
        setTextVisible(true);
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
        let num;

        const responseData = ref(database, `lobby-${gamePin}/numResponses`); 

        onValue(responseData, (snapshot) => {
            num = snapshot.val() + 1;              

            update(ref(database, 'lobby-' + gamePin), {
                numResponses: num
            });

            set(ref(database, `lobby-${gamePin}/responses/round-${round}/${playerId}`), {
                response: message, // Add the users message to the database while tracking the current round and the users id
                votes: 0
            });              
        
            if(num === numPlayers.length) {            
                channel.publish("Next Page", { text: "true" })
            }
        }, {
            onlyOnce: true
        });
    }

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

    /* PREVENT BACK */

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);

        window.addEventListener('popstate', function(event) {
            window.history.pushState(null, document.title, window.location.href);
        });
    }, []);
        
    /* RENDER */

    return(
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.subheader}>
                    <Header />                  
                </div>
                <TimerBar timeLength={ responseTime } path="/Bridge" />
                <HowToPlay />
            </div>
            <div className={styles.content}>
                <div className={styles.buttons}>
                    <Button
                        name={ buttonDisabled ? "✓" : "SUBMIT" }
                        static={ false }
                        press={ handleSubmit }
                        disabled={ buttonDisabled }
                    />
                </div>
                <div className={styles.container}>
                    <div className={styles.subtitle}>SCENARIO</div>
                    <div className={styles.prompt}>{ textVisible ? scenarioText : "" }</div>
                    <div className={styles.prompt}>What do you do...?</div>
                    <Textarea
                        placeholder="Enter Response..."
                        disabled ={ textAreaDisabled }
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
export default ScenarioPage;