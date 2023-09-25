// React
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChannel } from "@ably-labs/react-hooks";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setActivity } from '../Redux/sessionSlice.js';

// Database
import { ref, set, onValue } from "firebase/database";
import { database } from '../database.js';

// Components
import Button from '../components/Button.js'
import Textarea from '../components/Textarea.js'
import TimerBar from '../components/TimerBar.js'
import Header from '../components/Header.js'
import ShowMoreText from "react-show-more-text";

// Styles
import styles from '../styles/ScenarioPage.module.css';
import '../App.css';

function ChaosPage() {
    const navigate = useNavigate();
    
    /* REDUX */

    const gamePin = useSelector((state) => state.session.gamePin);
    const playerId = useSelector((state) => state.session.playerId);  

    const round = useSelector((state) => state.session.round);     
    const scenario = useSelector((state) => state.session.scenario);
    const numPlayers = useSelector((state) => state.session.ablyUsers);

    const dispatch = useDispatch();

    useEffect(() => {
        // Set up next activity for all players        
        dispatch(setActivity("discussion"));

        // Initialise the number of responses in database
        set(ref(database, `lobby-${gamePin}/responseCount/`), {
            numResponses: 0
        });  // eslint-disable-next-line
    }, []);

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
        let num = 0;

        const responseData = ref(database, `lobby-${gamePin}/responseCount/numResponses`); 

        onValue(responseData, (snapshot) => {
            if(snapshot.exists()) {
                num = snapshot.val() + 1; 
            }

            if(num === numPlayers.length) {            
                channel.publish("Next Page", { text: "true" })
            }
        });

        set(ref(database, `lobby-${gamePin}/responseCount/`), {
            numResponses: num
        }); 

        set(ref(database, `lobby-${gamePin}/responses/round-${round}/${playerId}`), {
            response: message, // Add the users message to the database while tracking the current round and the users id
            votes: 0
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
                <TimerBar timeLength= { responseTime } addTime="0" path="/Bridge" />
            </div>
            <div className={styles.content}>
                <div className={styles.buttons}>
                    <Button
                        name={ buttonDisabled ? "✓" : "SUBMIT" }
                        static={ false }
                        press={ handleSubmit}
                        disabled={ buttonDisabled }/>
                </div>
                <div className={styles.container}>
                    <div className={styles.subtitle}>SCENARIO</div>                  
                    <ShowMoreText
                        lines={3}
                        more={<span className={styles['show-more-link']}><br/>show more</span>}
                        less={<span className={styles['show-more-link']}><br/>show less</span>}
                        className={styles['show-more-text']}                        
                    >
                        <span className={styles['show-more-text']}>{ scenario }</span>
                    </ShowMoreText>
                    <div className={styles.chaos}><strong>Additional chaos goes here...</strong></div>
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

export default ChaosPage;