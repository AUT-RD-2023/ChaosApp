import React from 'react';
import styles from './styles/Button.module.css';

function DefaultButton(props){
    return(
        <button className={styles.button}>
            {props.name}
        </button>
    );
}

export default DefaultButton;