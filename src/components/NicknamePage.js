// React
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useParams, useNavigate, useLocation } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux'
import { setSessionId, setName, setPlayerId, setIsHost, resetDefaults } from "../Redux/sessionSlice"

// Database
import { ref, onValue, onDisconnect } from "firebase/database";
import { database } from '../database.js';

// Components
import Button from '../components/Button.js'
import Input from '../components/Input.js'
import Identity from '../identity.js'
import { ReactComponent as Logo } from '../styles/images/plain-logo.svg';

// Styles
import style from "../styles/NicknamePage.module.css";

function NicknamePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const isHost = location.state?.isHost; //useSelector((state) => state.session.isHost);

    const params = useParams();
    const joinPin = params?.pinNumber;

    if(!isHost) {
        dispatch(resetDefaults()); // Reset to the default values of all Redux variables
    } else {
        dispatch(setIsHost(true));
    }

    if(!isHost) {
        if(!((joinPin.length === 4) && (/^[0-9\b]+$/.test(joinPin)))) {
            window.location.href = "#/404"; // Redirects to the 404 page if url contains an incorrect pin code format.
        }
    }

    const [nickname, setNickname] = useState("");
    const identity = new Identity();

    const handleClick = () => {
        identity.makeNickname(nickname);
        dispatch(setPlayerId(identity.playerId));
        dispatch(setName(identity.nickname));
    }

    const gamePin = useRef({ value: isHost ? Math.floor(Math.random() * 8999 + 1000) : joinPin }).current.value;
    dispatch(setSessionId(gamePin));

    /* DATABASE */

        // Remove lobby when host disconnects
        if(isHost)
        {
            const presenceRef = ref(database, 'lobby-' + gamePin);
            onDisconnect(presenceRef).remove();
        }

    useEffect(() => {
        if(!isHost) {
            const entryData = ref(database, 'lobby-' + gamePin); // Get a reference to the data at this path in the database

            onValue(entryData, (snapshot) => { // Get a snapshot of the current value of the data
                if(!snapshot.exists()) {
                    navigate("/Error/invalid-pin"); // Navigate to the appropriate error page if the session does not already exist
                }
            });

            let sessionStarted;
            const sessionData = ref(database, 'lobby-' + gamePin + '/inSession');

            onValue(sessionData, (snapshot) => { sessionStarted = snapshot.val(); });
            if(sessionStarted) { navigate("/Error/session-started"); }
        }
    }, [isHost, gamePin, navigate]);


    /* RENDER */

    return (
        <div className={style.page}>
            <Logo className={style.logo}/>

            <div className={style.heading}>GET STARTED</div>

            <div className={style.container}>
                <Input
                    placeholder="Enter Nickname"
                    onChange={(e) => setNickname(e.target.value)}
                />
                <div className={style.spacer}/>
                <NavLink
                    to={ "/Lobby" }
                    state={{ identity: identity, gamePin: gamePin, isHost: isHost, settingsOpen: false}}
                >
                    <Button
                        name="NEXT"
                        static={ true } //button width is static, even if page height changes
                        disabled={ !(nickname && /\S/.test(nickname)) }
                        press={ handleClick }
                    />
                </NavLink>
            </div>
        </div>
    );
}

export default NicknamePage;