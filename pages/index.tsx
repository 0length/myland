import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { First } from "../sections/First";
import { Stat } from "../sections/Stat";
import { Blog } from "../sections/Blog";
import { About } from "../sections/About";
import Link from "next/link";

const homePath = "home";
const sectionData = {
  [homePath]: First,
  stat: Stat,
  blog: Blog,
  about: About,
};

function debounce(callback: () => void, wait: number) {
  let timerId: any;
  return () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback();
    }, wait);
  };
}

export type FadeStatus =
  | "fadeInUp"
  | "fadeOutUp"
  | "fadeInDown"
  | "fadeOutDown";

export const CreatePage: (initPage: keyof typeof sectionData) => NextPage = (
  initPage: keyof typeof sectionData
) =>
  function NextPageCreation(props) {
    const [toRightNavMenu, setToRIghtNavMenu] = useState(true);
    const [pageSection, setPageSection] =
      useState<keyof typeof sectionData>(initPage);
    const menuRef = useRef(null);
    const { data } = props as { data: any };
    const handleScrollMenu = () => {
      console.log(menuRef.current);
      menuRef.current &&
        (menuRef.current as any).scrollTo({
          left: toRightNavMenu ? (menuRef.current as any).scrollWidth : 0,
          behavior: "smooth",
        });
    };
    const handleScrollMenuState = debounce(() => {
      if (
        menuRef.current &&
        (menuRef.current as any).scrollWidth -
          (menuRef.current as any).scrollLeft +
          (menuRef.current as any).scrollLeft ==
          (menuRef.current as any).scrollWidth
      )
        setToRIghtNavMenu((old) => !old);
    }, 1000);

    const [fadeStatus, setFadeStatus] = useState<FadeStatus>("fadeInUp");

    const [scrollState, setScrollState] = useState(0);
    const bodyRef = useRef(null);
    const handleScroll = debounce(
      useCallback(() => {
        if (!bodyRef.current) return;
        // setTimeout(() => {
        const container: any = bodyRef.current;
        const containerScroll = container.offsetHeight + container.scrollTop;
        console.log(
          containerScroll,
          containerScroll < scrollState ? "down" : "up",
          container.scrollHeight
        );
        if (containerScroll > scrollState) {
          if (Object.keys(sectionData).indexOf(pageSection) != 0)
            handleSectionChange({
              target: {
                dataset: {
                  section:
                    Object.keys(sectionData)[
                      Object.keys(sectionData).indexOf(pageSection) + 1
                    ],
                },
              },
            });
        }
        if (containerScroll <= scrollState) {
          if (
            Object.keys(sectionData).indexOf(pageSection) !=
            Object.keys(sectionData).length - 1
          )
            handleSectionChange({
              target: {
                dataset: {
                  section:
                    Object.keys(sectionData)[
                      Object.keys(sectionData).indexOf(pageSection) + 1
                    ],
                },
              },
            });
        }
        setScrollState(containerScroll);
      }, [pageSection, scrollState]),
      1000
    );

    const ActiveSection = sectionData[pageSection];
    const handleSectionChange = useCallback(
      ({ target }: any) => {
        if (!target.dataset.section) return;
        const currIdx = Object.keys(sectionData).indexOf(pageSection);
        const nextIdx = Object.keys(sectionData).indexOf(
          target.dataset.section
        );
        const oldGoDown = currIdx > nextIdx;
        if (currIdx === nextIdx) return;
        setFadeStatus(!oldGoDown ? "fadeOutUp" : "fadeOutDown");
        setTimeout(() => {
          history.pushState(
            { page: `/${target.dataset.section}` },
            target.innerText,
            `/${target.dataset.section}`
          );
          setFadeStatus(!oldGoDown ? "fadeInUp" : "fadeInDown");
          setPageSection(target.dataset.section);
        }, 1000);
      },
      [pageSection]
    );

    useEffect(() => {
      // bodyRef.current && (bodyRef.current as any).addEventListener("scroll", handleScroll, { passive: true })

      menuRef.current &&
        (menuRef.current as any).addEventListener(
          "scroll",
          handleScrollMenuState,
          { passive: true }
        );

      return () => {
        // bodyRef.current && (bodyRef.current as any).removeEventListener("scroll", handleScroll)
        menuRef.current &&
          (menuRef.current as any).removeEventListener(
            "scroll",
            handleScrollMenuState
          );
      };
    }, []);

    useEffect(() => {
      document
        .querySelectorAll(`.menu a`)
        .forEach((item) => item.classList.remove("active-menu"));
      if (typeof location !== undefined) {
        document
          .querySelector(`.menu a[data-section="${pageSection}"]`)
          ?.classList.add("active-menu");
      }
    }, [pageSection]);


    return (
      <div ref={bodyRef} className={styles.bodyContainer}>
        <Head>
          <title>{"Welcome to 0lenth's Space"}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
        </Head>
        <header>
          <div className="container">
            <div className="menu">
              <img src="/logo.png" alt="" />
              <span ref={menuRef} className="potraitWidth60percent">
                <a data-section={homePath} onClick={handleSectionChange}>
                  Home
                </a>
                <a data-section={"stat"} onClick={handleSectionChange}>
                  Stats
                </a>
                <Link href="/blog">
                  <a data-section={"blog"} >Blog</a>
                </Link>
                <a data-section={"about"} onClick={handleSectionChange}>
                  About
                </a>
              </span>
              <i
                onClick={handleScrollMenu}
                className={" material-icons potritDisplayFlex"}
                style={{ alignSelf: "center", display: "none" }}
              >
                {toRightNavMenu ? "navigate_next" : "navigate_before"}
              </i>
            </div>
          </div>
        </header>
        <div className={styles.mainWrapper}>
          <main className={styles.main}>
            <section>
              <ActiveSection fadeStatus={fadeStatus} data={data} />
            </section>
          </main>
        </div>
        {/* <footer className={styles.footer}>
              <span className={styles.logo}>
                <img src="/logo.png" alt="Main Koding Logo" />
              </span>
            </footer> */}
      </div>
    );
  };
const Home = CreatePage(homePath);
export default Home;
