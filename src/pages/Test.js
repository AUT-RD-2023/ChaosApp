import React from "react";
import style from "../styles/test.module.css";
import other from "../styles/LobbyPage.module.css";
import Button from '../components/Button.js';

const Test = () => {

    return (
        <div className={style.page}>
            <div className={style.block1}>
                <div className={other.subtitle}>Chaos</div>
            </div>
            <div className={other.pin}>
                <span className={other.label}>GAME PIN: <br/></span>
                <span className={other.number}>1234</span>
            </div>
            <div className={style.block2}>
                <div className={style.block3}>
                    <Button name="Test 1"/>
                    <div className={other.spacer}></div>
                    <Button name="Test 2" />
                </div>
                <div className={other.container}>
                    <div className={other.players}></div>
                </div>
            </div>
        </div>
    );
}

export default Test;