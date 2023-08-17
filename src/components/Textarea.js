import React from 'react';
import styles from '../styles/Button.module.css';

const Textarea = ({ value, onChange, placeholder, maxLength }) => {
    return (
        <>
            <form>
                <textarea
                    className={styles.textarea}
                    id="gamePin"
                    type="text"
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                    maxLength={maxLength}
                />
            </form>
        </>
    );
}

export default Textarea;
