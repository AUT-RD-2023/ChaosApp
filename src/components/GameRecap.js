// React
import React from 'react';

// Components
import Button from "../components/Button.js";

// Styles
import style from '../styles/EndPage.module.css';

// Images
import img from '../styles/images/crown.svg';
//import icon from '../styles/images/share.svg';

export default function GameRecap() {
    return (        
        <div className={style.page}>
            <div className={style.container}>       
            <div>
                <img src={img} alt="alt" className={style.image_crown}/>
                <div className={style.subtitle}>SESSION FAVOURITES</div>
            </div> 
                <div className={style.recap}>            
                </div>            
            <div className={style.buttons}>
                <Button
                    name="PLAY AGAIN"
                    static={ false } //button width decreases as page height increases
                />
            </div>
            <div className={style.button_small}>
                <Button
                    /*img={ icon }
                    imgClass={ style.image_share }*/
                    name="SHARE"
                    static={ false } //button width decreases as page height increases
                />
                <div className={style.button_spacer} />
                <Button
                    name="QUIT"
                    static={ false } //button width decreases as page height increases
                />
            </div>
                
            </div>
        </div>
    )
}