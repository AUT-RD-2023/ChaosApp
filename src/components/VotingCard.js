import styles from '../styles/VotingPage.module.css';

const VotingCard = (props) => { 
    return(    
        <div className={styles.card}>
        <div className={styles.inner} tabIndex={0} onFocus={props.onFocus}>{props.response} <strong>{props.votes}</strong></div>
        </div>
    );
}

export default VotingCard;