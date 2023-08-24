// React
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { setSettingsOpen } from "../Redux/sessionSlice";

// Components
import IconButton from '../components/IconButton.js';
import Setter from "../components/Setter";
import Button from "../components/Button";

//Styles
import style from "../styles/SettingsPage.module.css";

function SettingsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* Window Resizing Handling */

    const [isWindowLandscape, setIsWindowLandscape] = useState(window.innerHeight < window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setIsWindowLandscape(window.innerHeight < window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isWindowLandscape) {
            dispatch(setSettingsOpen(true));
            navigate("/Lobby");
        }
    }, [isWindowLandscape, dispatch, navigate]);

    return(
        <div>
            <IconButton icon="back" onClick={dispatch(setSettingsOpen(false))}/>
        </div>
    );
}

export default SettingsPage;

