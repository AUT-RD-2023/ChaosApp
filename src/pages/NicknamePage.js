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

    const gamePin = useRef({ value: isHost ? Math.floor(Math.random() * 99999 + 10000) : joinPin });

    /* DATABASE */

    useEffect(() => {
        const entryData = ref(database, 'lobbies/lobby-' + joinPin + '/inSession');
    
        onValue(entryData, (snapshot) => {
            const dbSession = snapshot.val();
            console.log(dbSession);        
            
            if(dbSession || dbSession == undefined)
            {
                window.location.href = "#/404"; //instead of 404 page, different error page specific to lobby not existing / already in session
            }
        });
    }, []);

    /* JOIN ERROR */

    const [errorText, setErrorText] = useState("");

    const updateText = () => {
        //setErrorText(!dbStatus ? "The session you are trying to join does not exist!" : `The session you are trying to join (${gamePin.current.value}) has already started!`);

        setTimeout(() => {
            setErrorText("");
        }, 3000);  
    }

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
                    state={{ identity: identity, gamePin: gamePin.current.value, isHost: isHost }}
                >
                    <Button name="NEXT" disabled={ nickname && /\S/.test(nickname) ? false : true } press={() => { handleClick(); updateText(); }}/>
                </NavLink>
            </div>        
            <div>                    
                <p style={{textAlign: 'center', color: 'red'}}>{errorText}</p>
            </div>
        </div>
    );
}

export default NicknamePage;