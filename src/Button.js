import React from 'react';
import styles from './styles/Home.module.css';

function HostButton(props){
    return(
        <button className={styles.button}/*onClick={props.press}*/>
            {props.name}
        </button>
    );
}

export default HostButton;