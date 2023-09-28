import React, {useRef, useState} from 'react';

// Components
import DownloadButton from "../components/CreateDocument.js";
import { emailBody, emailSubj } from '../components/CreateEmail.js'

//Redux
import {useDispatch, useSelector} from "react-redux";

// Styles
import '../styles/Modal.css';

// Icons
import { ReactComponent as Email } from '../styles/images/email.svg';
import { ReactComponent as Close } from '../styles/images/close.svg';

function Modal({closeModal}) {
    const gamePin = useSelector((state => state.session.gamePin));
    const scenario = useSelector((state => state.session.scenario));

    const handleModalBackgroundClick = () => {
        closeModal(false);
    };

    const handleModalContainerClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="modalBackground" onClick={handleModalBackgroundClick}>
            <div className="modalContainer" onClick={handleModalContainerClick}>
                <div className="modalTop">
                    <div className="shareText">Share</div>
                    <div className="closeButton">
                        <Close className="modal_close" onClick={() => closeModal(false)} />
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