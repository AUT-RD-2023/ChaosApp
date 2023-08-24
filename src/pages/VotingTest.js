import other from '../styles/VotingTest.module.css';
import TimerBar from '../components/TimerBar';
import styles from '../styles/DiscussionPage.module.css';


const VotingTest = () => {

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
            <div className={other.block2}>
                <div className={other.card}></div>
            </div>
            <div className={other.block3}></div>
        </div>
       )
}

export default VotingTest;