import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Components
import DiscussionTutorial from '../components/DiscussionTutorial.js';
import ScenarioTutorial from '../components/ScenarioTutorial.js';
import VotingTutorial from '../components/VotingTutorial.js';
import WelcomeTutorial from '../components/WelcomeTutorial.js';
import NicknamePage from '../components/NicknamePage.js';

// import required modules
import { Navigation, Pagination} from 'swiper/modules';

// Styles
import style from "../styles/Tutorial.module.css";
import "../styles/swiper.css";


export default function TutorialPage() {

    const [isNicknamePageActive, setIsNicknamePageActive] = useState(false);
    const [swiper, setSwiper] = useState(null);
    const skipTutorial = () => swiper.slideTo(4);
    const onSlideChange = (swiper) => {
        if (swiper.activeIndex === 4) {
            setIsNicknamePageActive(true);
        } else {
            setIsNicknamePageActive(false);
        }
    };

    return (
        <div className={style.wrapper}>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={false}
                keyboard={false}
                modules={[Navigation, Pagination]}
                onSlideChange={onSlideChange}
                onSwiper={setSwiper}>
                <SwiperSlide><WelcomeTutorial/></SwiperSlide>
                <SwiperSlide><ScenarioTutorial/></SwiperSlide>
                <SwiperSlide><DiscussionTutorial/></SwiperSlide>
                <SwiperSlide><VotingTutorial/></SwiperSlide>
                <SwiperSlide><NicknamePage/></SwiperSlide>
            </Swiper>
            {!isNicknamePageActive ? (
                <div className={style.header}>
                    <div className={style.subtitle}>Chaotic</div>
                    <div className={style.skip} onClick={ skipTutorial }>Skip</div>
                </div>
            ) : <div className="faux_header"></div>}
        </div>
    );
}