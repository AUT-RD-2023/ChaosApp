// React
import React, { useState, useEffect } from 'react';
import style from '../styles/SlideSettings.module.scss'
import { ReactComponent as Settings } from '../styles/images/settings.svg';
import { ReactComponent as Close } from '../styles/images/close.svg';
import Button from '../components/Button.js'
import Setter from '../components/Setter';
import { useSelector, useDispatch } from 'react-redux'
import { setSettingsOpen } from "../Redux/sessionSlice";

const SlideSettings = (props) => {
    const dispatch = useDispatch()
    const settingsOpen = useSelector((state) => state.session.settingsOpen)

    const [savePressed, setSavePressed] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(settingsOpen);
    }, [settingsOpen]);

    const handleOpenClick = event => {
        dispatch(setSettingsOpen(true))
    };
    const handleCloseClick = event => {
        dispatch(setSettingsOpen(false))
    };

    const handleSave = () => {
        setSavePressed(true); // Passed to Setter component to handle database entries

        // Time out so that the database has time to process, otherwise it sets savePressed to false before the data is saved.
        setTimeout(() => {
            setSavePressed(false);
        }, 500);
    };

    return (
        <>
            <input type="checkbox" id="navcheck-h" role="button" className={ style.input } checked={ isChecked } readOnly/>
            <div className={style.label}></div>
            <Settings className={style.settings_icon} onClick={handleOpenClick}/>
            <div className={style.slide}>
                <div className={style.content}>
                    <div className={style.top}>
                        <Close className={style.close_icon} onClick={handleCloseClick}/>
                        <div className={style.title}>SETTINGS</div>
                    </div>
                    <div className={style.settings}>
                        <div className={style.heading}>Number of Rounds</div>
                        <Setter id="rounds" orientation="landscape" savePressed= { savePressed }/>
                        <div className={style.divider}/>
                        <div className={style.heading}>Response Timer (+30 sec)</div>
                        <Setter id="response" orientation="landscape" savePressed= { savePressed }/>
                        <div className={style.divider}/>
                        <div className={style.heading}>Discussion Timer (+30 sec)</div>
                        <Setter id="discussion" orientation="landscape" savePressed= { savePressed }/>
                        <div className={style.buttons}>
                            <Button name="RESET" static={ false }> </Button>
                            <div className={style.spacer} />
                            <Button name={ savePressed ? "✓" : "SAVE" } static={ false }  press={ handleSave }></Button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SlideSettings;