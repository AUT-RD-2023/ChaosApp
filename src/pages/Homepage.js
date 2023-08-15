// React
import React, { useState, useEffect } from 'react';
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
    const entryData = ref(database, 'lobbies/lobby-' + gamePin);

    function checkDatabase() {
        onValue(entryData, (snapshot) => {
            setDbExists(snapshot.exists());
            console.log(dbExists);
        });
    }

    useEffect(() => {
        if(gamePin.length === 5) {
            checkDatabase();
            //console.log(dbExists ? "use effect triggered, the game pin does exist in the database" : "useEffect triggered, the game pin does NOT exist in the database")
        }
    }, [gamePin]);

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
                    to={ dbExists ? `/Lobby/link/${gamePin}` : null } 
                    onClick={checkDatabase}
                    state={{ isHost: false, joinPin: gamePin }}
                >
                    <Button 
                        name="JOIN" //check if the provided Game Pin is at least 5 characters long, only contains numbers and isn't made up of only whitespace
                        disabled={ (gamePin.length === 5) && (/^[0-9\b]+$/.test(gamePin)) && (/\S/.test(gamePin)) ? false : true }                         
                    />
                </NavLink>
            </div>     
            
            <div className="button">
                <NavLink to="/Host" state={{ isHost: true }}>
                    <Button name="HOST" />
                </NavLink>              
            </div>
        </div>
    );
}

export default Homepage;