// React
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { configureAbly, useChannel, usePresence } from "@ably-labs/react-hooks";

// Database
import { ref, set } from "firebase/database";
import { database } from '../database.js';

// Components
import Button from '../components/Button.js';

// Styles
import style from '../styles/LobbyPage.module.css';
import '../App.css';

const LobbyPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const gamePin  = location.state?.gamePin;
    const identity = location.state?.identity;
    const isHost   = location.state?.isHost;

    /* ABLY */
    
    configureAbly({key: "yqb0VQ.Av_Gmg:pItSDLVHuUqgEGYCqdOhVSr4Ypktm7764_a0mhpwbEY", clientId: identity.playerId});

    const channelName = gamePin + "";
    const [presenceUsers] = usePresence(channelName, { nickname: identity.nickname });
    
    const [channel] = useChannel(channelName, (message) => { // Page navigation when host presses start
        if(message.data.text === "true") {
            navigate("/Bridge", { state: {activity: "start", round: 1, gamePin: gamePin, id: identity.playerId, nickname: identity.nickname, channel: channelName}});            
        }
    });

    const handleStart = () => {
        startSession();
        channel.publish("Start", { text: "true" });
    };

    /* DATABASE */

    useEffect(() => {
        if(isHost) {
            set(ref(database, 'lobby-' + gamePin), {
                gamePin: gamePin,
                inSession: false
            });            
            console.log(`Current game session added to database!\n[gamePin : ${gamePin}], [inSession : false]`);
        }
    }, [isHost, gamePin]);    

    function startSession() {
        set(ref(database, 'lobby-' + gamePin), {
            gamePin: gamePin,
            inSession: true
        });
    }

    /* INVITE LINK */

    const [textVisible, setTextVisible] = useState(false);
    
    const copyUrl = () =>{
        navigator.clipboard.writeText(window.location.href + `/link/${gamePin}`);
        setTextVisible(true);

        setTimeout(() => {
            setTextVisible(false);
        }, 2000);        
    };

    /* RENDER */

    const playButtonJSX = (       
        <div className={style.buttons}>
            <Button name="PLAY" press={handleStart}/>
        </div>);

    return (
        <div className="App">
            <span className={style.lobby}>
                <div className={style.subtitle}>Chaos</div>

                <div className={style.pin}>
                    <span className={style.label}>GAME PIN: <br/></span>
                    <span className={style.number}>{channelName}</span>
                </div>

                <div className={style.container}>
                    <div className={style.players}>
                        {presenceUsers.map((user, index) => (
                            <div className={style.grid_cell} key={user.clientId}>{user.data.nickname}</div>
                        ))}
                    </div>
                </div>

                {isHost ? playButtonJSX : null}

                <div className={style.buttons}>
                    <Button name="INVITE" press={copyUrl}/>
                    <p style={{textAlign: 'center'}}><strong>{textVisible ? "Link Copied!" : ""}</strong></p>
                </div>
            </span> 
        </div>
    );
}

export default LobbyPage;