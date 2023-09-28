import style from "../styles/EndPage.module.css";
import img from "../styles/images/crown.svg";
import Button from "../components/Button";
import Modal from "../components/Modal";
import React from "react";

// <div className={style.page}>
//     <div className={style.container}>
//         <div>
//             <img src={img} alt="alt" className={style.image_crown} />
//             <div className={style.subtitle}>SESSION FAVOURITES</div>
//         </div>
//         <div className={style.recap}></div>
//         <div className={style.buttons}>
//             <Button
//                 name="PLAY AGAIN"
//                 static={false} //button width decreases as page height increases
//                 press={ () => { handlePlayAagain(`${window.location.origin.toString()}`) } }
//             />
//             <div className={style.button_spacer}></div>
//             <Button
//                 name="SHARE"
//                 static={false}
//                 press={ () => {
//                     setOpenModal(true);
//                 }}
//             />
//             {openModal && <Modal closeModal={ setOpenModal } />}
//         </div>
//     </div>
// </div>