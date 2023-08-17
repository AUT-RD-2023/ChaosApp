import './Settings.css';
import Input from './Input.js';
import Button from '../components/Button.js';



function Setter(props) {

    let defaultNum = props.original;
    // let value = props.value;

    return (
        <div className="setter">
            <button name="+" className="increase-button" > + </button>
            <Input 
                    placeholder={defaultNum}
                    maxLength={5}
                    // onChange={ (e) => setSettingsValue((e.target.value) )} 
                />
                {/* <p>{defaultNum}</p> */}
            <button className="decrease-button"> - </button>
        </div>
    )
}



export default Setter