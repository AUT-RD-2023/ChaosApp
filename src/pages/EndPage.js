// React
import React, { useEffect } from 'react';

// Components
import CelebrationPage from "./CelebrationPage.js";
import GameRecapPage from "./GameRecapPage.js";

// Swiper
import { Navigation, Pagination} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Styles
import style from '../styles/EndPage.module.css';
import '../App.css';

function EndPage() {
    /* PREVENT BACK */

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);

        window.addEventListener('popstate', function(event) {
            window.history.pushState(null, document.title, window.location.href);
        });
    }, []);

    return (
        <>        
            <div className={style.wrapper}>
                <Swiper
                    cssMode={true}
                    mousewheel={false}
                    navigation={true}
                    keyboard={false}
                    modules={[Navigation, Pagination]}
                    allowSlidePrev={true}
                    >
                    <SwiperSlide><CelebrationPage/></SwiperSlide>
                    <SwiperSlide><GameRecapPage/></SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}

export default EndPage;