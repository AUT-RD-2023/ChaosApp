// React
import React from "react";

// Components
import Button from "../components/Button.js";
import TimerBar from "../components/TimerBar.js";

// Styles
//import style from "../styles/ScenarioPage.module.css";
import styles from "../styles/DiscussionPage.module.css";
import "../App.css";

function DiscussionPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.subheader}>
          <div className="name">Name</div>
          <div className="round">ROUND 1/5</div>
        </div>
        <TimerBar />
      </div>
      <div className={styles.discussion}>
        <div className={styles.buttons}>
          <Button name="NEXT"/>
          <div className={styles.spacer}/>
          <Button name="ADD TIME"/>
        </div>
        <div className={styles.container}>
            <div className={styles.completion}>1/5</div>
            <div className={styles.subtitle}>DISCUSSION</div>
            <div className={styles.response}>Test response</div>
        </div>
      </div>
    </div>
  );
}

export default DiscussionPage;
