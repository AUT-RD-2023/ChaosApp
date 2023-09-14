// React
import React, { useState }  from 'react';

// Components
import Button from "../components/Button.js";
import Celebration from "../components/Celebration.js";
import GameRecap from "../components/GameRecap.js";

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
    const [swiper, setSwiper] = useState(null);
    return (
        <>        
            <div className={style.wrapper}>
                <Swiper
                    cssMode={true}
                    mousewheel={false}
                    navigation={true}
                    pagination={true}
                    keyboard={false}
                    modules={[Navigation, Pagination]}>

                    <SwiperSlide><Celebration/></SwiperSlide>
                    <SwiperSlide><GameRecap/></SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}

export default EndPage;