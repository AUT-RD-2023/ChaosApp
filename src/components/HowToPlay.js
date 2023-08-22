import React from 'react';
import style from '../styles/HowToPlay.module.scss'

const HowToPlay = () => {
    return (
        <>
          <input type="checkbox" id="navcheck-s" role="button" className={style.input}/>
          <label htmlFor="navcheck-s" className={style.label}></label>
          <div className={style.slide}>
              <div className={style.content}>HOW TO PLAY</div>
          </div>
        </>
    );
};

export default HowToPlay;