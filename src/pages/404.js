// React
import React from 'react';

// Styles
import style from '../styles/LobbyPage.module.css';

function PageNotFound() {
    return(
        <div className={style.pin}>
            <span className={style.label}>ERROR - 404 Page Not Found</span>
        </div>  
    );
}

export default PageNotFound;