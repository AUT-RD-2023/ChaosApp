// React
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { configureAbly, usePresence } from "@ably-labs/react-hooks";
import { NavLink } from 'react-router-dom';

// Components
import Button from '../components/Button.js'

// Styles
import style from '../styles/LobbyPage.module.css';
import '../App.css';

const LobbyPage = () => {
    const location = useLocation();
    const gamePin  = location.state?.gamePin;
    const identity = location.state?.identity;

    console.log(gamePin);
    console.log(identity.playerId);
    console.log(identity.nickname);
    
    configureAbly({key: "yqb0VQ.Av_Gmg:pItSDLVHuUqgEGYCqdOhVSr4Ypktm7764_a0mhpwbEY", clientId: identity.playerId});    

    const channelName = gamePin + "";
    const [presenceUsers] = usePresence(channelName, { nickname: identity.nickname });

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
                            // index % 2 === 0 
                            //     ? <div className={style.grid_cell} key={user.clientId}>{user.data.nickname}</div>
                            //     : <div className={style.grid_cell}  style={{ textAlign: 'right' }} key={user.clientId}>{user.data.nickname}</div>)
                            <div className={style.grid_cell} key={user.clientId}>{user.data.nickname}</div>
                        ))}
                    </div>
                </div>

                <div className={style.buttons}>
                    <NavLink to="/Bridge">
                        <Button name="PLAY"/>
                    </NavLink>
                </div>

                <div className={style.buttons}>
                    {/*<NavLink to="/">*/}
                        <Button name="INVITE" press={copyUrl}/>
                    {/*</NavLink>*/}
                    <p style={{textAlign: 'center'}}>{textVisible ? "Link Copied!" : ""}</p>
                </div>
            </span> 
        </div>
    );
}

export default LobbyPage;