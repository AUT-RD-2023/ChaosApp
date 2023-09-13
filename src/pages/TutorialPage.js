// React
import React, {useEffect, useState} from 'react';

// Styles
import style from "../styles/Tutorial.module.css";

// Carousel
import Carousel from "nuka-carousel";
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

// Components
import DiscussionTutorial from '../components/DiscussionTutorial.js';
import ScenarioTutorial from '../components/ScenarioTutorial.js';
import VotingTutorial from '../components/VotingTutorial.js';
import WelcomeTutorial from '../components/WelcomeTutorial.js';
import NicknameRoute from '../components/NicknameRoute.js';


function TutorialPage() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [renderHeader, setRenderHeader] = useState(true);
    const [wasSkipped, setWasSkipped] = useState(0);


    const skipTutorial = () => {
        setWasSkipped(4);
    };

    const handleSlideChange = (newSlideIndex) => {
        setCurrentSlide(newSlideIndex);
        if(newSlideIndex !== 4){
            setWasSkipped(newSlideIndex);
        }
    };

    const onRightChevronClick = (nextSlide) => {
        console.log(currentSlide);

        if(currentSlide === 3){
            setRenderHeader(false);
        }
        nextSlide();
    }

    const onLeftChevronClick = (previousSlide) => {
        setRenderHeader(true);
        previousSlide();
    }

    const handleDragStart = (event) => {
        const touches = event.nativeEvent.touches;
        if (touches && touches.length === 1) {
            const touch = touches[0];
            const startX = touch.clientX;

            const handleTouchMove = (moveEvent) => {
                const moveX = moveEvent.touches[0].clientX;

                if (moveX > startX) { // Slide backwards
                    setRenderHeader(true);
                } else if (moveX < startX) {
                    if(currentSlide === 3) {
                        setRenderHeader(false);
                    }
                }

                document.removeEventListener('touchmove', handleTouchMove);
            };

            document.addEventListener('touchmove', handleTouchMove);
        }
    };

    // Chevron Rendering //

    const [isWindowLandscape, setIsWindowLandscape] = useState(window.innerHeight < window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setIsWindowLandscape(window.innerHeight < window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {renderHeader ? (
                <div className={style.header}>
                    <div className={style.subtitle}>Chaotic</div>
                    <div className={style.skip} onClick={ skipTutorial }>Skip</div>
                </div>
            ) : <div className="faux_header"></div>}
            <Carousel
                slideIndex={wasSkipped}
                afterSlide={handleSlideChange}
                onDragStart={handleDragStart}
                slidesToShow={1}
                defaultControlsConfig={{
                    pagingDotsStyle: {
                        fillOpacity: "0",
                        width: "2.5vh",
                        height: "2.5vh",
                        backgroundColor: "#75A78F",
                        margin: " 0 1.5vh 0",
                        borderRadius: "50%",
                    }
                }}
                renderCenterLeftControls={({ previousSlide, currentSlide }) => (
                    isWindowLandscape === false ? null : (
                        currentSlide === 0 ? null : (
                            <Icon
                                className={style.chevron}
                                size={5}
                                path={mdiChevronLeft}
                                onClick={() => onLeftChevronClick(previousSlide)}
                            />)
                    )
                )}
                renderCenterRightControls={({ nextSlide, currentSlide }) => (
                    isWindowLandscape === false ? null : (
                        currentSlide === 4 ? null : (
                            <Icon
                                className={style.chevron}
                                size={5}
                                path={mdiChevronRight}
                                onClick={() => onRightChevronClick(nextSlide)}
                            />)
                    )
                )}>
                <WelcomeTutorial/>
                <ScenarioTutorial/>
                <DiscussionTutorial/>
                <VotingTutorial/>
                <NicknameRoute />
            </Carousel>
        </>
    );
}
export default TutorialPage;
