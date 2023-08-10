// React
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {configureAbly, usePresence} from "@ably-labs/react-hooks";
import SettingsPage from './SettingsPage.js';

// Components
import Button from '../components/Button.js'
import Popup from '../components/Popup.js';


// Styles
import style from '../styles/LobbyPage.module.css';
import '../App.css';

const LobbyPage = () => {
    const location = useLocation();    
    const gamePin  = location.state?.gamePin;
    const identity = location.state?.identity;
    const isHost   = location.state?.isHost;


    console.log(gamePin);
    console.log(identity.playerId);
    console.log(identity.nickname);
    
    configureAbly({key: "yqb0VQ.Av_Gmg:pItSDLVHuUqgEGYCqdOhVSr4Ypktm7764_a0mhpwbEY", clientId: identity.playerId});    

    const channelName = gamePin + "";
    const [presenceUsers] = usePresence(channelName, { nickname: identity.nickname });

    const [textVisible, setTextVisible] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);


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
                            // index % 2 === 0 
                            //     ? <div className={style.grid_cell} key={user.clientId}>{user.data.nickname}</div>
                            //     : <div className={style.grid_cell}  style={{ textAlign: 'right' }} key={user.clientId}>{user.data.nickname}</div>)
                            <div className={style.grid_cell} key={user.clientId}>{user.data.nickname}</div>
                        ))}
                    </div>
                </div>

                <div className={style.buttons}>
                    {/*<NavLink to="/">*/}
                        <Button name="PLAY"/>
                    {/*</NavLink>*/}
                </div>

                <div className={style.buttons}>
                    {/*<NavLink to="/">*/}
                        <Button name="INVITE" press={copyUrl}/>
                    {/*</NavLink>*/}
                    <p style={{textAlign: 'center'}}>{textVisible ? "Link Copied!" : ""}</p>
                </div>
                <div>
                    {isHost ?   <button onClick={() => setButtonPopup(true)}>Open Popup
                            </button> : ""}
                </div>
                <div>
                            <p>{isHost ? "[DEBUG] You are the host." : "[DEBUG] You are NOT the host."}</p>
                </div>
                        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                            <SettingsPage>a</SettingsPage>
                         </Popup>
   
            </span> 
        </div>
    );
}

export default LobbyPage;