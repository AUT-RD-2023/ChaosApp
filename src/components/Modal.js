import React from 'react';

// Components
import Button from '../components/Button.js';
import DownloadButton from "../components/CreateDocument.js";

// Styles
import '../styles/Modal.css';

// Icons
import { ReactComponent as Download } from '../styles/images/download.svg';
import { ReactComponent as Email } from '../styles/images/email.svg';

function Modal({closeModal}) {

    const handleDownloadClick = event => {
            return(
            <DownloadButton />
            );
    };

    return (
    <div className="modalBackground" onClick={() => closeModal(false)}>
        <div className="modalContainer">
            <div className="modalTop">
                <h2 className="shareText">Share</h2>
                <div className="closeButton">
                    <button onClick={() => closeModal(false)}> X </button>
                </div>
            </div>
            <div className="modalButtons">
                <Download className="modalIcons" onClick={handleDownloadClick}/>
                <Email className="modalIcons"/>
                <div className="buttonText">Download</div> 
                <div className="buttonText">Email</div>
            </div>
        </div>
    </div>
    );
}

export default Modal;