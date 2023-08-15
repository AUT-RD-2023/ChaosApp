// React
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';

// Database
import { ref, onValue } from "firebase/database";
import { database } from '../database.js';

// Components
import Button from '../components/Button.js'
import Input from '../components/Input.js'
import Identity from '../identity.js'

// Styles
import '../App.css';

function NicknamePage() {    
    const location = useLocation();
    const params = useParams();

    const isHost = location.state?.isHost;
    const joinPin = params?.pinNumber;

    if(!isHost) { // Redirects to the 404 page if url contains an incorrect pin code format.
        if(!((joinPin.length === 5) && (/^[0-9\b]+$/.test(joinPin)))) {
            window.location.href = "#/404";
        } 
    }

    const [nickname, setNickname] = useState("");
    const identity = new Identity();

    const handleClick = () => {
        identity.makeNickname(nickname);
    }

    const gamePin = useRef({ value: isHost ? Math.floor(Math.random() * 89999 + 10000) : joinPin }).current.value;        

    /* DATABASE */

    useEffect(() => {
        let dbExists;
        let dbSession;

        const entryData = ref(database, 'lobbies/lobby-' + gamePin);
        const sessionData = ref(database, 'lobbies/lobby-' + gamePin + '/inSession');

        onValue(entryData, (snapshot) => {
            dbExists = snapshot.exists();
            console.log(snapshot.exists() ? "Valid session" : "Error! The session you are trying to join does not exist.");
        });

        onValue(sessionData, (snapshot) => {
            dbSession = snapshot.val(); //check if inSession is true
            console.log (snapshot.val() ? "The game has already started (inSession : true)" : "The game has not yet started (inSession : false)")
        });

        if(!dbExists) {
            window.location.href = "#/Error/invalid-pin";
        } 
        else if (dbSession) {
            window.location.href = "#/Error/session-started";
        }
    }, [gamePin]);

    /* RENDER */

    return (
        <div className="App">     
            <div className="title">Chaos</div>
            
            <div className="heading">GET STARTED</div>

            <div className="container">
                <Input
                    placeholder="Enter Nickname"
                    onChange={(e) => setNickname(e.target.value)}
                />
                <NavLink
                    to={ "/Lobby" }
                    state={{ identity: identity, gamePin: gamePin, isHost: isHost }}
                >
                    <Button name="NEXT" disabled={ nickname && /\S/.test(nickname) ? false : true } press={ handleClick }/>
                </NavLink>
            </div>
        </div>
    );
}

export default NicknamePage;