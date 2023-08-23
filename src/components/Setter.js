import styles from '../styles/SlideSettings.module.scss';
import Input from './Input.js';


function Setter(props) {

    let defaultNum = props.original;
    let value = props.value;


    function increaseNum() {
       for (let i = 0; i < value; i++){
        defaultNum++;
       }
        props.setTimer(defaultNum);
        console.log(defaultNum);

    }

    function decreaseNum() {
        defaultNum -= value;
        props.setTimer(defaultNum);
        console.log(defaultNum);
    }
  

    return (
        <div className={styles.setter}>
            <button name="-" className={styles.decrease_button} onClick={() =>decreaseNum()} >- </button>
            <Input
                    style={{width: "7vw", height: "3.5vw", fontSize: "1.5vw"}}
                    placeholder={defaultNum}
                    maxLength={5}
                    onChange={ (e) => props.setTimer((e.target.value) )}
                />
            <button className={styles.increase_button} onClick={() =>
                increaseNum()}>+</button>
        </div>
    )
}



export default Setter