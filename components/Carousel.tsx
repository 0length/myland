import React, { useCallback, useEffect, useState } from "react";
import styles from '../styles/Carousel.module.css';
import { TimeDisplay } from "./TimeDisplay";
import {motion, useAnimationControls} from 'framer-motion';
let timer: any, animate: any;

const TIMEOUT = 5000;

export const Carousel = ({ className, data }: { className: string, data: any }) => {
    const [active, setActive] = useState<number>(0);
    const [showOption, setShowOption] = useState(false);
    const controls = useAnimationControls();
    const text = useAnimationControls();
    const handleCleanUp = ()=>{
        if(animate && timer){
            clearInterval(animate);
            clearInterval(timer);
            animate = undefined;
            timer = undefined;
        }
    }
    const handleFirstInterval = ()=>{
        handleCleanUp();
        animate = setInterval(() => {
            controls.start({ scale: 0.95, transitionTimingFunction:"ease-in-out",transitionDuration: '0.1s'});
            text.start({ opacity: 0});
        }, TIMEOUT-200);
        timer = setInterval(() => {
            setActive(active + 1 === data.length ? 0 : active + 1);
        }, TIMEOUT);
    }

    useEffect(() => {
        return handleCleanUp();
    }, []);

    useEffect(()=>{
        controls.start({ scale: 1,transitionTimingFunction:"ease-in-out", transitionDuration: '0.1s'});
        text.start({ opacity: 1});
        handleFirstInterval();
    }, [active])

    useEffect(() => {
        () => {
            timer && clearTimeout(timer);
            animate && clearTimeout(animate);
            timer = undefined;
            animate = undefined;
        }
    }, []);

    const handleZoom = useCallback(() => {
        const modalContainer = document.querySelector('div.modal-image-zoom');
        const modalContent = document.querySelector('img.modal-image-zoom-content');
        (modalContainer as any).style.display = "block";
        (modalContent as any).src = data[active].img_url;
    }, [active]);
    
    if(!data) return <>No record Found!</>;

    return (<div className={styles.firstHighlightCarouselWrapper.concat(" ").concat("potrait100percent potraitPaddingTop25vh").concat(" " + className)}>
        <div className={styles.firstHighlightCarouselContainer.concat(" ").concat("potrait100percent")}>
            <div className={styles.firstHighlightCarouselPosterContainer.concat(" ").concat("potraitHeight50vw")} onMouseOver={() => setShowOption(true)} onMouseOut={() => setShowOption(false)}>
                {
                   <div
                        className={styles.firstHighlightCarouselPosterContainerDiv}
                    >
                   <motion.img
                   onMouseOver={handleCleanUp}
                   onMouseOut={handleFirstInterval}
                   animate={controls}
                   className={styles.firstHighlightCarouselPosterImg} src={data[active].img_url} style={!showOption ? { opacity: 1 } : { opacity: 0.15, zIndex: 1 }} />
                   <div className={styles.firstHighlightCarouselPosterImg.concat(" ").concat("option-icons")}>
                       { active>0 && <i onClick={()=>{
                           setActive((old)=>(old-1))
                        //    clearInterval(timer)
                           }} className={" material-icons"} style={!showOption ? { opacity: 0.15 } : { opacity: 1, zIndex: 2 }}>navigate_before</i>}
                   
                       <i className={" material-icons"} onClick={handleZoom} style={!showOption ? { opacity: 0 } : { opacity: 1, zIndex: 2, fontSize: '18px' }}>zoom_out_map</i>
                       <a href={"/" + data[active].block_url} style={!showOption ? { opacity: 0 } : { opacity: 1, zIndex: 2 }}>
                           <i className={" material-icons"} >fullscreen</i>
                       </a>
                       <a rel="noreferrer" href={"/" + data[active].block_url} target="_blank" style={!showOption ? { opacity: 0 } : { opacity: 1, zIndex: 2, fontSize: '20px' }}>
                           <i className={" material-icons"} >open_in_new</i>
                       </a>
                       {active!==(data.length-1) && <i className={" material-icons"} onClick={()=>{
                           setActive((old)=>(old+1))
                        //    clearInterval(timer)
                           }} style={!showOption ? { opacity: 0 } : { opacity: 1, zIndex: 2 }}>navigate_next</i>}
                   </div>
                   </div>
                }
            </div>
            <motion.div
            animate={text}
            className={styles.firstHighlightCarouselPosterTitle}>
                <h1>
                    {data[active].title}
                </h1>
                <div className={styles.firstHighlightCarouselPosterTitleDate}>
                    <h3>
                        <TimeDisplay time={data[active].date} />
                    </h3>
                </div>
            </motion.div>
            <div className={styles.firstHighlightCarouselPagingConteiner}>
            </div>
        </div>
        <div className="modal-image-zoom">
            <i onClick={() => {
                (document.querySelector('div.modal-image-zoom') as any).style.display = "none"
            }} className="material-icons modal-image-zoom-close">close</i>
            <img className="modal-image-zoom-content" />
        </div>
    </div>)
}
