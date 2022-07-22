import { Carousel } from "../components/Carousel";
import { FadeStatus } from "../pages";
import styles from '../styles/Home.module.css';

export const First = ({fadeStatus}: {fadeStatus: FadeStatus}) => {
    return <>
     {/* @ts-ignore */}
     <marquee className={styles.firsMarquee.concat(" ").concat("potritDisplayNone ")} behavior="" direction="left">{"Classy web developer who wants to learn, create, earn and share".toUpperCase()}</marquee>
            <Carousel className={" ".concat(" "+fadeStatus)}/>
            <div className={styles.firstImgContainer.concat(" ").concat("potritDisplayNone ")}>
              <img src="./photo/2.jpg" alt="" className={styles.firstImg.concat(" "+fadeStatus)} />
            </div>
    </>
}

