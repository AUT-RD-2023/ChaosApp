// React
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { configureAbly, useChannel, usePresence } from "@ably-labs/react-hooks";
import { useSelector } from 'react-redux'

// Database
import { ref, set } from "firebase/database";
import { database } from '../database.js';

// Components
import Button from '../components/Button.js';

// Styles
import style from '../styles/LobbyPage.module.css';
import '../App.css';

const LobbyPage = () => {
    const gamePin = useSelector((state) => state.session.gamePin)
    const identity = useSelector((state) => state.session.identity)
    const isHost = useSelector((state) => state.session.isHost)

    const navigate = useNavigate();

    /* ABLY */
    configureAbly({key: "yqb0VQ.Av_Gmg:pItSDLVHuUqgEGYCqdOhVSr4Ypktm7764_a0mhpwbEY", clientId: identity.playerId});

    const channelName = "" + gamePin;
    const [presenceUsers] = usePresence(channelName, { nickname: identity.nickname });
    
    const [channel] = useChannel(channelName, (message) => { // Page navigation when host presses start
        if(message.data.text === "true") {
            navigate("/Bridge", { state: { activity: "start", round: 1, id: identity.playerId, nickname: identity.nickname }});
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
            inSession: true,
            discussionTimer: 30
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

    const playButtonJSX = (<><Button name="PLAY" press={handleStart}/><div className={style.spacer}></div></>);

    return (
        <div className={style.page}>
            <div className={style.header}>
                <div className={style.subtitle}>Chaos</div>
            </div>
            <div className={style.pin}>
                <span className={style.label}>GAME PIN: <br/></span>
                <span className={style.number}>&nbsp;{channelName}</span>
            </div>
            <div className={style.lobby}>
                <div className={style.buttons}>
                    {isHost ? playButtonJSX : null}
                    <Button name={textVisible ? "✓" : "INVITE"} press={copyUrl}/>
                    {/*<p style={{textAlign: 'center'}}>{textVisible ? "Link Copied!" : ""}</p>*/}
                </div>
                <div className={style.container}>
                    <div className={style.players}>
                        {presenceUsers.map((user, index) => (
                            <div key={user.clientId}>{user.data.nickname}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LobbyPage;