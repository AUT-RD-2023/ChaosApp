// React
import React, { useState, useEffect } from 'react';

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

// Styles
import styles from '../styles/ScenarioPage.module.css';
import '../App.css';

function ChaosPage() {
    /* REDUX */

    const gamePin = useSelector((state) => state.session.gamePin);
    const playerId = useSelector((state) => state.session.playerId);  

    const round = useSelector((state) => state.session.round);     
    const scenario = useSelector((state) => state.session.scenario);

    const dispatch = useDispatch();

    useEffect(() => {
        // Set up next activity for all players        
        dispatch(setActivity("discussion")) // eslint-disable-next-line
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
                <TimerBar timeLength= { responseTime } addTime="0" path="/Bridge" />
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
                    <div className={styles.scenario}>{ scenario }</div>
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