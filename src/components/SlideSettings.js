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
                        <Setter original="02" id="rounds" orientation="landscape" />
                        <div className={style.divider}/>
                        <div className={style.heading}>Response Timer (+30 sec)</div>
                        <Setter original="01:00" orientation="landscape" />
                        <div className={style.divider}/>
                        <div className={style.heading}>Discussion Timer (+30 sec)</div>
                        <Setter original="02:00" orientation="landscape" />
                        <div className={style.buttons}>
                            <Button name="RESET" static={ false }> </Button>
                            <div className={style.spacer} />
                            <Button name="SAVE" static={ false }></Button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SlideSettings;