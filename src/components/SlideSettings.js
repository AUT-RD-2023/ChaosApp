// React
import React, { useState, useEffect } from 'react';

// Style
import style from '../styles/SlideSettings.module.scss'

// Components
import Button from '../components/Button.js'
import Setter from '../components/Setter';
import { ReactComponent as Settings } from '../styles/images/settings.svg';
import { ReactComponent as Close } from '../styles/images/close.svg';
import CustomPopUp from "./CustomPopUp";
import Switch from "./Switch";

// Redux
import { useSelector, useDispatch } from 'react-redux'
import {setCustomScenario, setSettingsOpen, setUseCustomScenario} from "../Redux/sessionSlice";

const SlideSettings = () => {
    const dispatch = useDispatch()
    const settingsOpen = useSelector((state) => state.session.settingsOpen)

    const [savePressed, setSavePressed] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const [customPopUpVisible, setCustomPopUpVisible] = useState(false);

    const [customChecked, setCustomChecked] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);

    const customScenario = useSelector((state) => state.session.customScenario);

    useEffect(() => {
        if(customScenario) {
            setPreviewVisible(true);
        }
        // eslint-disable-next-line
    }, []); 

    useEffect(() => {
        setIsChecked(settingsOpen);
    }, [settingsOpen]);

    const handleOpenClick = () => {
        dispatch(setSettingsOpen(true))
    };
    const handleCloseClick = () => {
        dispatch(setSettingsOpen(false))
    };

    const handleSave = () => {
        setSavePressed(true); // Passed to Setter component to handle database entries

        // Time out so that the database has time to process, otherwise it sets savePressed to false before the data is saved.
        setTimeout(() => {
            setSavePressed(false);
        }, 500);
    };

    /* Custom Scenario Popup */
    const handleCustom = () => {
        setCustomChecked((prev) => !prev); //set checked to the opposite of it's previous state
    };

    const onCustomPopUpClose = () => {
        setCustomPopUpVisible(false);
        setCustomChecked(false);
    }

    const handleCustomDelete = () => {
        dispatch(setCustomScenario(null));
        setCustomChecked(false);
        setPreviewVisible(false);
    }

    const handleCustomConfirm = () => {
        setCustomPopUpVisible(false);
        setPreviewVisible(true);
    }

    useEffect(() => {
        if(customChecked && !customScenario) {
            setTimeout(() => {
                setCustomPopUpVisible(true);
            }, 200);
        }
        dispatch(setUseCustomScenario(customChecked));
        // eslint-disable-next-line
    }, [customChecked]);

    return (
        <>
            { customPopUpVisible ? <CustomPopUp onClose={ onCustomPopUpClose } onConfirm={ handleCustomConfirm } /> : null }
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
                        <div className={style.divider} />
                            <div className={style.custom_wrapper}>
                                <p className= {style.custom} >Use Custom Scenario</p>
                                <div style={{position: "absolute", right: "12vw"}} >
                                    <Switch label=" " checked={ customChecked } onChange={ handleCustom } />
                                </div>
                            </div>
                            { customChecked && previewVisible ?
                                <div className={style.custom_wrapper}>
                                    <p className= {style.preview}>{ customScenario }</p>
                                    <div className={style.clear} onClick={ handleCustomDelete }>
                                        DELETE
                                    </div>
                                </div> : ""
                            }
                        </div>
                        <div className={style.buttons}>
                            <Button name="RESET" static={ true }> </Button>
                            <div className={style.spacer} />
                            <Button name={ savePressed ? "✓" : "SAVE" } static={ true }  press={ handleSave }></Button>
                        </div>
                    </div>
            </div>
        </>
    );
};

export default SlideSettings;