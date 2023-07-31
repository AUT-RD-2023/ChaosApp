import React from 'react';
import '../App.css';
import style from '../styles/LobbyPage.module.css';
import Button from '../components/Button.js';
import {NavLink} from "react-router-dom";

const LobbyPage = () => {
    return (
        <div className="App">
            <div className= {style.subtitle} >Kia Rite</div>
            <div className={style.pin}>
                <span className={style.label}>GAME PIN: <br /></span>
                <span className={style.number}>4845</span>
            </div>

            <div className="container">
                <span className= {style.players} >
                    <p>Player 1</p>
                    <p>Player 2</p>
                    <p>Player 3</p>
                    <p>Player 4</p>
                    <p>Player 5</p>
                    <p>Player 6</p>
                    <p>Player 7</p>
                    <p>Player 8</p>
                </span>
            </div>

            <div className="button">
                {/*<NavLink to="/">*/}
                    <Button name="INVITE" />
                {/*</NavLink>*/}
            </div>
            <div className="button">
                {/*<NavLink to="/">*/}
                    <Button name="PLAY" />
                {/*</NavLink>*/}
            </div>
        </div>
    );
}

export default LobbyPage;