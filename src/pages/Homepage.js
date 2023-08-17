// React
import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

// Database
import { database } from '../database.js';
import { ref, onValue } from "firebase/database";

// Components
import Button from '../components/Button.js'
import Input from '../components/Input.js'

// Styles
import '../App.css';

const Homepage = () => {
    const [gamePin, setGamePin] = useState("");

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
        if(gamePin.length === 5) {
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
            <div className="title">Chaos</div>

            <div className="container">
                <Input 
                    placeholder="Game PIN"
                    maxLength={5}
                    onChange={ (e) => setGamePin(e.target.value) }
                />
                <NavLink 
                    to={ dbExists && !dbSession ? `/Lobby/link/${gamePin}` : null } 
                    onClick={ checkDatabase }
                    state={{ isHost: false, joinPin: gamePin }}
                >
                    <Button 
                        name="JOIN" //check if the provided Game Pin is at least 5 characters long, only contains numbers and isn't made up of only whitespace
                        disabled={ (gamePin.length === 5) && (/^[0-9\b]+$/.test(gamePin)) && (/\S/.test(gamePin)) ? false : true }       
                        press={ updateText }                  
                    />
                </NavLink>
            </div>     
            
            <div className="button">
                <NavLink to="/Host" state={{ isHost: true }}>
                    <Button name="HOST" />
                </NavLink>              
            </div>
                    
            <div>                    
                <p style={{textAlign: 'center', color: 'red'}}><strong>{errorText}</strong></p>
            </div>
        </div>
    );
}

export default Homepage;