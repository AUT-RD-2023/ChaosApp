import React, { useState } from 'react';
import style from '../styles/SlideSettings.module.scss'
import { ReactComponent as Settings } from '../styles/images/settings.svg';
import { ReactComponent as Close } from '../styles/images/close.svg';
import Button from '../components/Button.js'
import Setter from '../components/Setter';

const SlideSettings = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleOpenClick = event => {
        setIsChecked(true);
    };
    const handleCloseClick = event => {
        setIsChecked(false);
    };

    return (
        <>
            <input type="checkbox" id="navcheck-h" role="button" className={ style.input } checked={ isChecked } readOnly/>
            <div className={style.label}></div>
            <Settings className={style.icon} onClick={handleOpenClick}/>
            <div className={style.slide}>
                <div className={style.content}>
                    <div className={style.top}>
                        <Close className={style.close} onClick={handleCloseClick}/>
                        <div className={style.title}>SETTINGS</div>
                    </div>
                    <div className={style.settings}>
                        <div className={style.heading}>Number of Rounds</div>
                        <Setter original="02"/>
                        <div className={style.divider}/>
                        <div className={style.heading}>Response Timer (+30 sec)</div>
                        <Setter original="01:00"/>
                        <div className={style.divider}/>
                        <div className={style.heading}>Discussion Timer (+30 sec)</div>
                        <Setter original="02:00"/>
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