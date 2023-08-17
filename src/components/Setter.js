import './Setter.css';
import Input from './Input.js';


function Setter(props) {

    let defaultNum = props.original;


    return (
        <div className="setter">
            <div className="increase-button" onClick={() => defaultNum += props.value}> + </div>
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