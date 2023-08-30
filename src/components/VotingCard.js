import styles from '../styles/VotingPage.module.css';

const VotingCard = (props) => { 
    //const resp = response;
    //const ID = playerID;

    //console.log(ID);

    return(
        
        <div className={styles.card} tabIndex={0}>{props.response}</div>
    );
}

export default VotingCard;