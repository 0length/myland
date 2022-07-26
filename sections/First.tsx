import { useCallback, useEffect, useState } from "react";
import { Carousel } from "../components/Carousel";
import styles from "../styles/Home.module.css";
import { PageWithData } from "./Blog";

export const First = ({ fadeStatus, data }: PageWithData) => {

  return (
    <>
      {/* @ts-ignore */}
      <marquee
        className={styles.firsMarquee.concat(" ").concat("potritDisplayNone ")}
        behavior=""
        direction="left"
      >
        {"Classy web developer who wants to learn, earn, create and share".toUpperCase()}
      {/* @ts-ignore */}
      </marquee>
      <style>{`section{
                height: 80%;
              }`}</style>
      <Carousel data={data} className={" ".concat(" " + fadeStatus)} />
      <div
        className={styles.firstImgContainer
          .concat(" ")
          .concat("potritDisplayNone ")}
      >
        <img
          src="/photo/2.jpg"
          alt=""
          className={styles.firstImg.concat(" " + fadeStatus)}
        />
      </div>
    </>
  );
};
