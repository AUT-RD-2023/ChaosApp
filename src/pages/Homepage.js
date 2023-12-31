// React
import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux'
import { resetDefaults, setOpenAIKey } from "../Redux/sessionSlice";

// Database
import { database } from '../database.js';
import { ref, onValue } from "firebase/database";

// Components
import Button from '../components/Button.js'
import Input from '../components/Input.js'
import Logo from '../styles/images/logo_with_smoke.png';

// Styles
import '../App.css';

const Homepage = () => {
    const [gamePin, setGamePin] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {    
        dispatch(resetDefaults()); // Reset to the default values of all Redux variables 

        const data = ref(database, 'OpenAI_API_KEY');

        onValue(data, (snapshot) => {
            dispatch(setOpenAIKey(snapshot.val()));
        }, {
            onlyOnce: true
        });
        // eslint-disable-next-line
    }, []);

    /* DATABASE */

    const [dbExists, setDbExists] = useState(false);    
    const entryData = ref(database, 'lobby-' + gamePin);

    const [dbSession, setDbSession] = useState(false);
    const sessionData = ref(database, 'lobby-' + gamePin + '/inSession');

    const checkDatabase = useCallback(() => {
        onValue(entryData, (snapshot) => {
            setDbExists(snapshot.exists());
        });

        onValue(sessionData, (snapshot) => {
            setDbSession(snapshot.val());
        });
    }, [entryData, sessionData]);

    useEffect(() => {
        if(gamePin.length === 4) {
            checkDatabase();
        }
    }, [gamePin, checkDatabase]);

    
    /* JOIN ERROR */

    const [errorText, setErrorText] = useState("");

    const updateText = () => {
        setErrorText(!dbExists ? "The session you are trying to join does not exist!" : dbSession ? "The session you are trying to join has already started!" : "");

        setTimeout(() => {
            setErrorText("");
        }, 2000);  
    }

    
    /* RENDER */

    return (
        <div className="App">
            <img className="homepage_logo" src={Logo} alt="Logo" />
            <div className="container">
                <Input 
                    placeholder="Game PIN"
                    maxLength={4}
                    onChange={ (e) => setGamePin(e.target.value) }
                />
                <NavLink 
                    to={ dbExists && !dbSession ? `/Lobby/link/${gamePin}` : null } 
                    onClick={ checkDatabase }
                    state={ { joinPin: gamePin, isHost: false } }
                >
                 <div className="spacer"/>
                   <Button
                        name="JOIN" //check if the provided Game Pin is at least 4 characters long, only contains numbers and isn't made up of only whitespace
                        static={ true }
                        disabled={ (gamePin.length === 4) && (/^[0-9\b]+$/.test(gamePin)) && (/\S/.test(gamePin)) ? false : true }
                        press={ updateText }                  
                    />
                </NavLink>
            </div>     
            
            <div className="button">
                <NavLink 
                    to="/Host" 
                    state={ { isHost: true } } 
                >
                    <Button
                        name="HOST"
                        static={ true }
                    />
                </NavLink>              
            </div>
                    
            <div>                    
                <p style={{textAlign: 'center', color: 'red'}}><strong>{errorText}</strong></p>
            </div>
        </div>
    );
}

export default Homepage;