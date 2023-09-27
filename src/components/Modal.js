import React from 'react';

// Components
import DownloadButton from "../components/CreateDocument.js";
import { emailBody, emailSubj } from '../components/CreateEmail.js'

//Redux
import { useSelector } from "react-redux";

// Styles
import '../styles/Modal.css';

// Icons
import { ReactComponent as Email } from '../styles/images/email.svg';

function Modal({closeModal}) {
    const gamePin = useSelector((state => state.session.gamePin));
    const scenario = useSelector((state => state.session.scenario));

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="modalTop">
                    <h2 className="shareText">Share</h2>
                    <div className="closeButton">
                        <button onClick={() => closeModal(false)}> X </button>
                    </div>
                </div>
                <div className="modalButtons">
                    <DownloadButton 
                        className="modalIcons" 
                    />
                    <Email 
                        className="modalIcons"
                        onClick={ () => {
                            window.location.href = `mailto:example@email.com?subject=${emailSubj(gamePin)}&body=${emailBody(gamePin, scenario, "empty")}` 
                        }} 
                    />
                    <div className="buttonText">Download</div> 
                    <div className="buttonText">Email</div>
                </div>
            </div>
        </div>
    );
}

export default Modal;