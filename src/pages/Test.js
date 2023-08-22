import React from "react";
import style from "../styles/LobbyPage.module.css";
import Button from '../components/Button.js';

const Test = () => {

    return (
        <div className={style.page}>
            <div className={style.header}>
                <div className={style.subtitle}>Chaos</div>
            </div>
            <div className={style.pin}>
                <span className={style.label}>GAME PIN: <br/></span>
                <span className={style.number}></span>
            </div>
            <div className={style.lobby}>
                <div className={style.buttons}>
                    <Button name="PLAY"/>
                    <div className={style.spacer}></div>
                    <Button name="INVITE" />
                </div>
                <div className={style.container}>
                    <div className={style.players}>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Test;