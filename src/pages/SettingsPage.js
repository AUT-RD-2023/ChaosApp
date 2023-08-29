// React
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

// Redux
import {useDispatch} from "react-redux";
import { setSettingsOpen } from "../Redux/sessionSlice";

// Components
import IconButton from '../components/IconButton.js';
import Setter from "../components/Setter";
import Button from "../components/Button";
import Switch from "../components/Switch";

//Styles
import style from "../styles/SettingsPage.module.css";
import CustomPopUp from "../components/CustomPopUp";
import styles from "../styles/DiscussionPage.module.css";

function SettingsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [savePressed, setSavePressed] = useState(false);
    const [customPopUpVisible, setCustomPopUpVisible] = useState(false);

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


    /* Button Functionality */

    const handleSave = () => {
        setSavePressed(true); // Passed to Setter component to handle database entries

        // Time out so that the database has time to process, otherwise it sets savePressed to false before the data is saved.
        setTimeout(() => {
            setSavePressed(false);
        }, 500);

        dispatch(setSettingsOpen(false))
    };

    const handleReset= () => {
        // Reset to default values stored in redux store
    };

    /* Custom Scenario Popup */
    const handleCustom= () => {
        setCustomPopUpVisible(true);
    };

    return(
        <div>
            { customPopUpVisible ? <CustomPopUp onClose={() => setCustomPopUpVisible(false)} /> : null }
            <IconButton icon="back" onClick={dispatch(setSettingsOpen(false))}/>
            <div className={ style.content }>
                <div className={ style.title }>SETTINGS</div>
                <div className={style.settings}>
                    <div>
                        <div className={style.heading}>Number of Rounds</div>
                        <Setter id="rounds" orientation="portrait" savePressed= { savePressed }/>
                    </div>
                    <div className={style.divider}/>
                    <div>
                        <div className={style.heading}>Response Timer (+30 sec)</div>
                        <Setter id="response" orientation="portrait" savePressed= { savePressed }/>
                    </div>
                    <div className={style.divider}/>
                    <div>
                        <div className={style.heading}>Discussion Timer (+30 sec)</div>
                        <Setter id="discussion" orientation="portrait" savePressed={ savePressed }/>
                    </div>
                    <div className={style.divider} />
                    <div className ={style.toggles} >
                        <div className={style.custom_wrapper}>
                            <p className= {style.custom} >Competitive Mode</p>
                            <div style={{position: "absolute", right: "12vw"}}>
                                <Switch label=" "/>
                            </div>
                        </div>
                        <div className={style.custom_wrapper}>
                            <p className= {style.custom} >Use Custom Scenario</p>
                            <div style={{position: "absolute", right: "12vw"}} >
                                <Switch label=" " />
                            </div>
                        </div>
                        <div className={style.custom_wrapper}>
                            <p className= {style.preview}>This is an example custom scenario</p>
                            <div className={style.clear} >
                                DELETE
                            </div>
                        </div>
                    </div>
                    </div>
                <div className={style.buttons}>
                    <div className="spacer" />
                    <Button name="RESET" static={ false } press={ handleReset }> </Button>
                    <div className="spacer" />
                    <Button name="SAVE" static={ false } press={ handleSave } ></Button>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;