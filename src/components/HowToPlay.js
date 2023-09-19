import React from 'react';
import style from '../styles/HowToPlay.module.scss'
import { ReactComponent as HowTo } from '../styles/images/howtoplay.svg';
import { ReactComponent as Close } from '../styles/images/close.svg';
import SlideSettings from "./SlideSettings";
import IconButton from "./IconButton";

const HowToPlay = (props) => {
    const handleOpenClick = event => {
        const checkbox = document.getElementById('navcheck-s');
        if (checkbox) {
            checkbox.checked = true;
        }
    };

    const handleCloseClick = event => {
        const checkbox = document.getElementById('navcheck-s');
        if (checkbox) {
            checkbox.checked = false;
        }
    };

    return (
        <>
          {props.isLobby ? <HowTo className={style.howtoplay_lobby} onClick={handleOpenClick}/> :
              <HowTo className={style.howtoplay_icon} onClick={handleOpenClick}/>}

          <input type="checkbox" id="navcheck-s" role="button" className={style.input} readOnly/>
          <label htmlFor="navcheck-s" className={style.label}></label>
          <div className={style.slide}>
              <div className={style.content}>
              <div className={style.top}>
                  <Close className={style.close_icon} onClick={handleCloseClick}/>
                  <div className={style.title}>HOW TO PLAY</div>
              </div>
              <div className={style.howtoplay}>
                  <div className={style.subheading}>Phase 1: A Scenario</div>
                  <div className={style.text}>You'll be presented with a potentially hazardous incident. Think about how you would respond and submit your answer before the timer runs out.</div>
                  <div className={style.subheading}>Phase 2: The Discussion</div>
                  <div className={style.text}> When everyone has had time to submit an answer, each player's response is read out. The group will then consider whether it leads to a good outcome or has unintended consequences.
                      <br /><br />
                      The host can add more time if the timer if you need it, or they can skip similar responses.</div>
                  <div className={style.subheading}>Phase 3: Voting</div>
                  <div className={style.text}>During the voting phase, you can select the response that you found the most valuable for preparing you in your workplace.</div>
                  <div className={style.subheading}>Phase 4: Chaos</div>
                  <div className={style.text}>If you're playing for multiple rounds, after voting the scenario-discussion-voting loop will restart but with a chaotic twist added to the original scenario.</div>
                  <div className={style.subheading}>Phase 5: Game End</div>
                  <div className={style.text}>At the end of the game you have to opportunity to save or share the scenarios and responses of your game. <br /><br /> Come back in a week and revisit the scenario to see what's changed for each person.</div>
              </div>
              </div>
          </div>
        </>
    );
};

export default HowToPlay;