// React
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChannel } from "@ably-labs/react-hooks";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setActivity } from '../Redux/sessionSlice.js';

// Database
import { ref, set, update, onValue } from "firebase/database";
import { database } from '../database.js';

// Components
import Button from '../components/Button.js'
import Textarea from '../components/Textarea.js'
import TimerBar from '../components/TimerBar.js'
import Header from '../components/Header.js'
import ShowMoreText from "react-show-more-text";

// Styles
import styles from '../styles/ChaosPage.module.css';
import '../App.css';

function ChaosPage() {
    const navigate = useNavigate();
    
    /* REDUX */

    // Admin session data
    const gamePin = useSelector((state) => state.session.gamePin);
    const round = useSelector((state) => state.session.round);
    const isHost = useSelector((state) => state.session.isHost);
    const playerId = useSelector((state) => state.session.playerId);
    const numPlayers = useSelector((state) => state.session.ablyUsers);

    // Scenario session data
    const scenario = useSelector((state) => state.session.scenario);
    const fullScenario = useSelector((state) => state.session.fullScenario);
    const chaos = useSelector((state) => state.session.chaos);

    const dispatch = useDispatch();

    const [chaosText, setChaosText] = useState(""); 

    useEffect(() => {
        if(isHost) {
            // Reinitialise the number of responses in database
            update(ref(database, 'lobby-' + gamePin), {
                numResponses: 0
            });

            update(ref(database, `lobby-${gamePin}/chaos/round-${round}`), {
                scenario: chaos
            }); 
        }         

        // Set up next activity for all players        
        dispatch(setActivity("discussion")); // eslint-disable-next-line
    }, []);

    if(chaosText === "") {
        const responseData = ref(database, `lobby-${gamePin}/chaos/round-${round}/scenario`);

        onValue(responseData, (snapshot) => {
            if(snapshot.exists()) {                
                setChaosText(snapshot.val());      
            }          
        });
    }



    /* BUTTON */

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [textAreaDisabled, setTextAreaDisabled] = useState(false);
    const [scenarioExpanded, setScenarioExpanded] = useState(false);

    const handleSubmit = () => {
        setButtonDisabled(true);
        setTextAreaDisabled(true);

        updateDatabase();
    }

    const checkScenarioExpanded= () => {
        setScenarioExpanded(!scenarioExpanded);
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
                response: message,
                votes: 0
            });              
        
            if(num === numPlayers.length) {            
                channel.publish("Next Page", { text: "true" })
            }
        }, {
            onlyOnce: true
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



    /* ABLY */
    
    const [channel] = useChannel(gamePin + "", (message) => {
        if (message.name === "Next Page") {
            navigate("/Bridge");
        }
    }); 



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
                <TimerBar timeLength={ responseTime } addTime="0" path="/Bridge" />
            </div>
            <div className={styles.content}>
                <div className={styles.buttons}> {/*Response input button container*/}
                   <Button
                       name={ buttonDisabled ? "✓" : "SUBMIT" }
                       static={ false }
                       press={ handleSubmit}
                       disabled={ buttonDisabled }/>
                </div>
                <div className={styles.container}>
                   <div className={styles.title}>SCENARIO</div> {/*Page Title*/}
                    <div className={styles.chaos_wrapper} >

                        <ShowMoreText /*Collapsible original scenario*/
                            lines={2}
                            more={<span className={styles['show-more-link']}><br/>show more</span>}
                            less={<span className={styles['show-more-link']}><br/>show less</span>}
                            className={styles['show-more-text']}
                            onClick={ checkScenarioExpanded }>
                            <span className={styles['show-more-text']}>{ fullScenario }</span>
                        </ShowMoreText>

                        <div className={styles.chaos}><strong>{ chaosText }</strong></div> {/*ChatGPT generated chaos*/}

                        <div className={styles.what_would_you_do}>What do you do...?</div>
                    </div>

                    { scenarioExpanded ? <span className={styles.chaos_gradient_overlay} /> : null} {/*White gradient when expanded to indicate more content*/}

                    <span className={styles.input}> {/*Response input box*/}
                        <Textarea
                            placeholder="Enter Response..."
                            disabled ={ textAreaDisabled }
                            onChange={(e) => setMessage(e.target.value)}
                            popUp={ false } />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ChaosPage;