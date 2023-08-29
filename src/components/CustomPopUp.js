// React
import React from 'react';

// Style
import styles from '../styles/CustomPopUp.module.css';

// Components
import Button from "../components/Button.js";
import Textarea from "../components/Textarea.js";
import IconButton from '../components/IconButton.js';
import { ReactComponent as Close } from '../styles/images/close.svg';
import {setSettingsOpen} from "../Redux/sessionSlice";

const CustomPopUp = () => {

    return (
        <div className={ styles.page }>
            <div className={ styles.wrapper }>
                <Close className={styles.close_icon}/>
                <div className={ styles.textarea } >
                    <Textarea
                        placeholder="Enter custom scenario"
                        popUp = {true}
                    />
                </div>
                <div className={ styles.button } >
                    <Button
                        name="SAVE"
                        static={ false } //button width is static, even if page height changes
                    />
                </div>
            </div>
        </div>
    );
}

export default CustomPopUp;