import './Settings.css';
import Input from './Input.js';


function Setter(props) {

    let defaultNum = props.original;
    let value = props.value;

    function increaseNum() {
        defaultNum += value;
        props.setTimer(defaultNum);
        return defaultNum;

    }

    function decreaseNum() {
        defaultNum -= value;
        props.setTimer(defaultNum);
        return defaultNum;
    }
  

    return (
        <div className="setter">
            <button name="+" className="increase-button" onClick={() =>increaseNum()} > + </button>
            <Input 
                    placeholder={defaultNum}
                    maxLength={5}
                    onChange={ (e) => props.setTimer((e.target.value) )} 
                />
            <button className="decrease-button" onClick={() =>decreaseNum()} > -</button>
        </div>
    )
}



export default Setter