import React, { useCallback, useEffect, useState } from "react"
import styles from '../styles/Carousel.module.css'
import { TimeDisplay } from "./TimeDisplay";
let timer: any, animate: any;

let timeout = 5000;
let animateDurPlain = 2;
let animateDurMS = animateDurPlain * 1000;

export const Carousel = ({ className, data }: { className: string, data: any }) => {

    const [active, setActive] = useState<number>(0);
    const [showOption, setShowOption] = useState(false);

    useEffect(() => {

        // animate = setTimeout(() => {

        // }, timeout-animateDurMS);

        timer = setTimeout(() => {
            setActive(active + 1 === data.length ? 0 : active + 1);
        }, timeout);

    }, [active]);

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

    return (<div className={styles.firstHighlightCarouselWrapper.concat(" ").concat("potrait100percent potraitPaddingTop25vh").concat(" " + className)}>
        <div className={styles.firstHighlightCarouselContainer.concat(" ").concat("potrait100percent")}>
            <div className={styles.firstHighlightCarouselPosterContainer.concat(" ").concat("potraitHeight50vw")} onMouseOver={() => setShowOption(true)} onMouseOut={() => setShowOption(false)}>
                {
                    <div className={styles.firstHighlightCarouselPosterContainerDiv}>
                        <img className={styles.firstHighlightCarouselPosterImg} src={data[active].img_url} style={!showOption ? { opacity: 1 } : { opacity: 0.15, zIndex: 1 }} />
                        <div className={styles.firstHighlightCarouselPosterImg.concat(" ").concat("option-icons")}>
                            {data.length > 1 && <i className={" material-icons"} style={!showOption ? { opacity: 0.15 } : { opacity: 1, zIndex: 2 }}>navigate_before</i>}

                            <i className={" material-icons"} onClick={handleZoom} style={!showOption ? { opacity: 0 } : { opacity: 1, zIndex: 2, fontSize: '18px' }}>zoom_out_map</i>
                            <a href={"/blog/" + data[active].block_url} style={!showOption ? { opacity: 0 } : { opacity: 1, zIndex: 2 }}>
                                <i className={" material-icons"} >fullscreen</i>
                            </a>
                            <a rel="noreferrer" href={"/blog/" + data[active].block_url} target="_blank" style={!showOption ? { opacity: 0 } : { opacity: 1, zIndex: 2, fontSize: '20px' }}>
                                <i className={" material-icons"} >open_in_new</i>
                            </a>
                            {data.length > 1 && <i className={" material-icons"} style={!showOption ? { opacity: 0 } : { opacity: 1, zIndex: 2 }}>navigate_next</i>}
                        </div>
                    </div>
                }
            </div>
            <div className={styles.firstHighlightCarouselPosterTitle}>
                <h1>
                    {data[active].title}
                </h1>
                <div className={styles.firstHighlightCarouselPosterTitleDate}>
                    <h3>
                        <TimeDisplay time={data[active].date} />
                    </h3>
                </div>
            </div>
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
