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
import styles from '../styles/ScenarioPage.module.css';
import '../App.css';

function ChaosPage() {
    const navigate = useNavigate();
    
    /* REDUX */

    const gamePin = useSelector((state) => state.session.gamePin);
    const round = useSelector((state) => state.session.round);     
    const isHost = useSelector((state) => state.session.isHost);
    const playerId = useSelector((state) => state.session.playerId);  

    const scenario = useSelector((state) => state.session.scenario);
    const numPlayers = useSelector((state) => state.session.ablyUsers);

    const dispatch = useDispatch();

    useEffect(() => {
        if(isHost) {
            // Reinitialise the number of responses in database
            update(ref(database, 'lobby-' + gamePin), {
                numResponses: 0
            });
        }         
        // Set up next activity for all players        
        dispatch(setActivity("discussion")); // eslint-disable-next-line
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