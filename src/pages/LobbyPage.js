import React from 'react';
import '../App.css';
import style from '../styles/LobbyPage.module.css';
import Button from '../Button.js';

const LobbyPage = () => {
    return (    
        <>
            <h1 className={style.h1}>Kia Rite</h1>
            <h2 className={style.h2}>
                GAME PIN: <br />
                4845
            </h2>
            <div className={style.player_container}>
                    <p>Player 1</p>
                    <p>Player 2</p>
                    <p>Player 3</p>
                    <p>Player 4</p>
                    <p>Player 5</p>
                    <p>Player 6</p>
                    <p>Player 7</p>
                    <p>Player 8</p>
            </div>
            <div className={style.button_container}>
                <Button name="INVITE" />
                <Button name="PLAY" />
            </div>     
        </>
    );
}
export default LobbyPage;