// React
import React from "react";

// Components
import Button from "../components/Button.js";
import TimerBar from "../components/TimerBar.js";

// Styles
import style from "../styles/ScenarioPage.module.css";
import styles from "../styles/DiscussionPage.module.css";
import "../App.css";

function DiscussionPage() {
  return (
    <div className="App">
      <div className="header">
        <div className="name">
          <strong>NICKNAME{/*state.nickname*/}</strong>
        </div>
        <div className="round">ROUND {/*state.round*/}#/5</div>
      </div>

      <div className={style.timer}>
        <TimerBar timeLength="3000" path="/Bridge" />
      </div>

      <div className="content">
        <div className={styles.container}>
            <h2 className={styles.h2} style={{fontSize:"2vw"}}>1/5</h2>
            <h1 className={styles.h1}>DISCUSSION</h1>
            <p className={styles.text}>Hello{/*ENTER RESPONSE HERE*/}</p>
          <div style={{ marginTop: "2vh" }}>
            <Button
                name="NEXT"
            />
          </div>
          <div style={{marginTop: "2vh"}}>
            <Button
                    name="ADD TIME"
                />
            </div>
        </div>
      </div>
    </div>
  );
}

export default DiscussionPage;
