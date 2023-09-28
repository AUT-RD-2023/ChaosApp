import styles from '../styles/VotingPage.module.css';

const VotingCard = (props) => { 
    return(    
        <div 
            className={props.focusable ? styles.card : props.selected ? styles.card3 : styles.card2} 
            tabIndex={0} 
            onFocus={props.onFocus}>
                {props.response}&nbsp;<strong>{props.votes}</strong>
        </div>
    );
}

export default VotingCard;