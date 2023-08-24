import styles from '../styles/SlideSettings.module.scss';
import Input from './Input.js';


function Setter(props) {

    let defaultNum = props.original;


    function increaseNum() {
        // Increase number in the database.
    }

    function decreaseNum() {
        // Decrease value in the database.
    }
  

    return (
        <div className={styles.setter}>
            <button name="-" className={styles.decrease_button} onClick={() =>decreaseNum()} >- </button>
            <Input
                    style={{width: "7vw", height: "3.5vw", fontSize: "1.5vw"}}
                    placeholder={defaultNum}
                    maxLength={5}
                />
            <button className={styles.increase_button} onClick={() =>
                increaseNum()}>+</button>
        </div>
    )
}



export default Setter