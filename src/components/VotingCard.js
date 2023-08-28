import styles from '../styles/VotingPage.module.css';

const VotingCard = (response, playerID) => { 
    const resp = response;
    const ID = playerID;

    console.log(ID);

    return(
        
        <div className={styles.card} tabIndex={0}>{resp}</div>
    );
}

export default VotingCard;