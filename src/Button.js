import React from 'react';

function HostButton(props){
    return(
        <button /*onClick={props.press}*/>
            {props.name}
        </button>
    );
}

export default HostButton;