// React
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {configureAbly, useChannel, usePresence} from "@ably-labs/react-hooks";
import { NavLink } from 'react-router-dom';

// Components
import Button from '../components/Button.js'

// Styles
import style from '../styles/LobbyPage.module.css';
import '../App.css';

const LobbyPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const gamePin  = location.state?.gamePin;
    const identity = location.state?.identity;

    // Channel configuration
    configureAbly({key: "yqb0VQ.Av_Gmg:pItSDLVHuUqgEGYCqdOhVSr4Ypktm7764_a0mhpwbEY", clientId: identity.playerId});
    const channelName = gamePin + "";
    const [presenceUsers] = usePresence(channelName, { nickname: identity.nickname });

    // Page navigation when host presses start
    const [channel] = useChannel(channelName, (message) => {
        if(message.data.text === "true") {
            navigate("/Message", { state: {id: identity.playerId, nickname: identity.nickname, channel: channelName}});
        }
    });
    const handleStart = () => {
        channel.publish("Start", { text: "true" });
    };

    // Link generation
    const [textVisible, setTextVisible] = useState(false);
    const copyUrl = () =>{
        navigator.clipboard.writeText(window.location.href + `/link/${gamePin}`);
        setTextVisible(true);

        setTimeout(() => {
            setTextVisible(false);
        }, 2000);        
    };

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

                {/*Temporary button to go to message page*/}
                <div className={style.buttons}>
                    <Button name="ably" press={handleStart}/>
                </div>

                {/*<div className={style.buttons}>*/}
                {/*    <NavLink*/}
                {/*        to="/Bridge"*/}
                {/*        state={{activity: "start", round: 1}}>*/}
                {/*            <Button name="PLAY"/>*/}
                {/*    </NavLink>*/}
                {/*</div>*/}

                <div className={style.buttons}>
                    <Button name="INVITE" press={copyUrl}/>
                    <p style={{textAlign: 'center'}}>{textVisible ? "Link Copied!" : ""}</p>
                </div>
            </span> 
        </div>
    );
}

export default LobbyPage;