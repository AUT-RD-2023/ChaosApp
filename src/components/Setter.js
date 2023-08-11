import './Setter.css';
import Input from './Input.js';


function Setter(props) {
    const value = props.value;

    return (
        <div className="setter">
            <button className="increase-button"> + </button>
            <Input 
                    placeholder={value}
                    maxLength={5}
                    // onChange={ (e) => setValue(e.target.value) }  set target timer/rounds to input
                />
            <button className="decrease-button"> - </button>
        </div>
    )
}

export default Setter