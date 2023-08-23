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

    const name = "Name".toUpperCase();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.subheader}>
          <div className="name">{name}</div>
          <div className="round">ROUND 1/5</div>
        </div>
        <TimerBar />
      </div>
      <div className={styles.div_spacer}/>
      <div className={styles.discussion}>
        <div className={styles.buttons}>
          <Button
              name="NEXT"
              static={ false } //button width decreases as page height increases
          />
          <div className={styles.button_spacer}/>
          <Button
              name="ADD TIME"
              static={ false } //button width decreases as page height increases
          />
        </div>
        <div className={styles.container}>
            <div className={styles.completion}>1/5</div>
            <div className={styles.subtitle}>DISCUSSION</div>
            <div className={styles.response}>
                The average paragraph is around 200 words. This can vary depending on the type of writing you're doing. For example, if you're writing a paper for school, your teacher may have a specific word count in mind. In general, though, a paragraph should be about five to seven sentences long.
            </div>
        </div>
      </div>
    </div>
  );
}

export default DiscussionPage;
