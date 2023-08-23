import React from 'react';
import { ReactComponent as Settings } from '../styles/images/settings.svg';
import { ReactComponent as Back } from '../styles/images/back.svg';
import style from "../styles/SlideSettings.module.scss";
import { useNavigate } from "react-router-dom";

function Button(props) {
    const navigate = useNavigate();

    const handleSettingsClick = event => {
        navigate("/SettingsPage");
    };
    const handleBackClick = event => {
        navigate("/Lobby");
    };

    if(props.icon === "settings") {
        return (
            <Settings className={style.icon} onClick={handleSettingsClick} />
        );
    } else if (props.icon === "back") {
        return (
            <Back className={style.back} onClick={handleBackClick} />
        )
    }
}

export default Button;