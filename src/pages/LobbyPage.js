import React from 'react';
import '../App.css';
import { useLocation } from 'react-router-dom';
import {configureAbly, usePresence} from "@ably-labs/react-hooks";
import style from '../styles/LobbyPage.module.css';
import Button from '../components/Button.js'



const LobbyPage = (props) => {
    const location = useLocation();
    const identity = location.state?.identity;

    configureAbly({key: "yqb0VQ.Av_Gmg:pItSDLVHuUqgEGYCqdOhVSr4Ypktm7764_a0mhpwbEY", clientId: identity.playerId});
    const [presenceUsers] = usePresence('guy-hue-hip', {
        nickname: identity.nickname,
    })

    return (
        <div className="App">
            <span className={style.lobby}>
                <div className={style.subtitle}>Chaos</div>
                <div className={style.pin}>
                    <span className={style.label}>GAME PIN: <br/></span>
                    <span className={style.number}>4845</span>
                </div>

                <br/>
                <br/>
                {presenceUsers.map((user, index) => (
                    <div key={user.clientId}>
                        <li>{user.data.nickname} is {user.clientId}</li>
                    </div>
                ))}

                {/*<div className={style.container}>*/}
                {/*    <div className={style.players}>*/}
                {/*            <div className={style.grid_cell}>LongNickname</div>*/}
                {/*            <div className={style.grid_cell} style={{textAlign: 'right'}}>Player 2</div>*/}
                {/*            <div className={style.grid_cell}>Player 3</div>*/}
                {/*            <div className={style.grid_cell} style={{textAlign: 'right'}}>Player 4</div>*/}
                {/*            <div className={style.grid_cell}>Player 5</div>*/}
                {/*            <div className={style.grid_cell} style={{textAlign: 'right'}}>Player 6</div>*/}
                {/*            <div className={style.grid_cell}>Player 7</div>*/}
                {/*            <div className={style.grid_cell} style={{textAlign: 'right'}}>Player 8</div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className={style.buttons}>
                    {/*<NavLink to="/">*/}
                    <Button name="INVITE"/>
                    {/*</NavLink>*/}
                </div>
                <div className={style.buttons}>
                    {/*<NavLink to="/">*/}
                    <Button name="PLAY"/>
                    {/*</NavLink>*/}
                </div>
            </span>
        </div>
    );
}

export default LobbyPage;