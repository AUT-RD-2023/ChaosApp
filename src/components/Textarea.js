import React from 'react';
import styles from '../styles/Button.module.css';

const TextArea = ({ value, disabled, onChange, placeholder, maxLength }) => {
    return (
        <>
            <form>
                <textarea
                    className={styles.textarea}
                    id="gamePin"
                    type="text"
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    placeholder={placeholder}
                    maxLength={maxLength}
                />
            </form>
        </>
    );
}

export default TextArea;
