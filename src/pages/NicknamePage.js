// React
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useParams, useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
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
        if(!isHost) {
            const entryData = ref(database, 'lobbies/lobby-' + gamePin); // Get a reference to the data at this path in the database

            onValue(entryData, (snapshot) => { // Get a snapshot of the current value of the data
                if(!snapshot.exists()) { 
                    navigate("/Error/invalid-pin"); // Navigate to the appropriate error page if the session does not already exist
                }});            
            
            let sessionStarted;
            const sessionData = ref(database, 'lobbies/lobby-' + gamePin + '/inSession');

            onValue(sessionData, (snapshot) => { sessionStarted = snapshot.val(); });
            if(sessionStarted) { navigate("/Error/session-started"); }
        }
    }, [isHost, gamePin, navigate]);

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