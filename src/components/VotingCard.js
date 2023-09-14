import styles from '../styles/VotingPage.module.css';

const VotingCard = (props) => { 
    return(        
        <div className={styles.card} tabIndex={0} onFocus={props.onFocus}>{props.response} <strong>{props.votes}</strong></div>
    );
}

export default VotingCard;