import './Setter.css';
import useState from 'react';
import Input from './Input.js';


function Setter(props) {

    let defaultNum = props.original;


    return (
        <div className="setter">
            <button className="increase-button"> + </button>
            <Input 
                    placeholder={defaultNum}
                    maxLength={5}
                    // onChange={ (e) => setSettingsValue((e.target.value) += props.value )} 
                />
                {/* <p>{defaultNum}</p> */}
            <button className="decrease-button"> - </button>
        </div>
    )
}



export default Setter