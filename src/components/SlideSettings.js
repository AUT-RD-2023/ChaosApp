import React from 'react';
import style from '../styles/SlideSettings.module.scss'

const SlideSettings = () => {
    return (
        <>
            <input type="checkbox" id="navcheck-h" role="button" className={style.input}/>
            <label htmlFor="navcheck-h" className={style.label}></label>
            <div className={style.slide}>
                <div className={style.content}>SETTINGS</div>
            </div>
        </>
    );
};

export default SlideSettings;