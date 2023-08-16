// React
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Styles
import style from '../styles/LobbyPage.module.css';

function ErrorPage() {
    const params = useParams();
    const error = params?.error;

    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        switch(error) {
            case 'invalid-pin': 
                setErrorText("The session you are trying to join does not exist!");
                break;
            case 'session-started': 
                setErrorText("The session you are trying to join has already started!");
                break;
            default:
                setErrorText("404 Page Not Found");
                break;
        }
    }, [error]);

    return(
        <div className={style.pin}>
            <span className={style.label}>ERROR - {errorText}</span>
        </div>  
    );
}

export default ErrorPage;