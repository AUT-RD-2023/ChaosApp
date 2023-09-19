// React
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setSettingsOpen, setCustomScenario, setUseCustomScenario } from "../Redux/sessionSlice";

// Components
import IconButton from '../components/IconButton.js';
import Setter from "../components/Setter";
import Button from "../components/Button";
import Switch from "../components/Switch";

//Styles
import style from "../styles/SettingsPage.module.css";
import CustomPopUp from "../components/CustomPopUp";

function SettingsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [savePressed, setSavePressed] = useState(false);
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
    const handleCustom = () => {
        setCustomChecked((prev) => !prev); //set checked to the opposite of its previous state
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

    return(
        <div>
            { customPopUpVisible ? <CustomPopUp onClose={ onCustomPopUpClose } onConfirm={ handleCustomConfirm } /> : null }
            <IconButton icon="back" onClick={dispatch(setSettingsOpen(false))}/>
            <div className={ style.content }>
                <div className={ style.title }>SETTINGS</div>
                <div className={ style.settings }>
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
                            <p className= {style.custom} >Use Custom Scenario</p>
                                <Switch label=" " checked={ customChecked } onChange={ handleCustom } />
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