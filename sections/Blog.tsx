import { Client } from "@notionhq/client";
import React, { useEffect, useState } from "react";
import { FadeStatus } from "../pages";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css"; // only needed for code highlighting
import { NotionRenderer } from "react-notion";
import { TimeDisplay } from "../components/TimeDisplay";
import { FaFacebookF, FaTwitter, FaLinkedin } from "react-icons/fa";
import Head from "next/head";
import { useRouter } from "next/router";

export type PageWithData = { fadeStatus: FadeStatus; data: any };
function shareOnFacebook() {
  const navUrl =
    "https://www.facebook.com/sharer/sharer.php?u=" + location.href;
  window.open(navUrl, "_blank");
}
function shareOnTwitter() {
  const navUrl = "https://twitter.com/intent/tweet?text=" + location.href;
  window.open(navUrl, "_blank");
}
function shareOnLinkedin() {
  window.open(
    "https://www.linkedin.com/shareArticle?text=hello&url=" + location.href,
    "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
  );
}
export const Blog = ({ fadeStatus, data }: PageWithData) => {
  const { route } = useRouter();
  if(!data) return <span style={{ alignSelf: "center" }}>{"Cooming Soon!"}</span>;
  const postTitle = data.firstChild.results[0].heading_1.rich_text[0].text.content;
  const postCover = data.page.cover.external.url;

  return (
    <div
      className={fadeStatus}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      
        <>
          <Head>
            <title>{data.block.child_page.title}</title>
            <meta
              name="description"
              content={
                postTitle
              }
            />
            <meta
              property="og:title"
              content={
                postTitle
              }
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={route} />
            <meta property="og:image" content={postCover} />
            <meta
              name="twitter:title"
              content={data.block.child_page.title}
            />
            <meta
              name="twitter:description"
              content={
                postTitle
              }            />
            <meta
              name="twitter:image"
              content={postCover}
            />
            <meta name="twitter:card" content="summary_large_image"></meta>
          </Head>
          <div
            className="notion-cover"
            style={{
              background: `url('${postCover}') no-repeat center center fixed`,
            }}
          ></div>
          <div className="post-header">
            <div className="author">
              <div className="author-avatar">
                <img alt="" src={data.author.avatar_url} />
              </div>
              <div className="author-detail">
                <div className="author-name">{data.author.name}</div>
                <div className="post-date">
                  <TimeDisplay time={data.page.created_time} />
                </div>
              </div>
            </div>
            <div className="share">
              <div className="social">
                <span onClick={shareOnTwitter}>
                  <FaTwitter />
                </span>
                <span onClick={shareOnFacebook}>
                  <FaFacebookF />
                </span>
                <span onClick={shareOnLinkedin}>
                  <FaLinkedin />
                </span>
              </div>
            </div>
          </div>
          <NotionRenderer blockMap={data.content} />
        </>
    </div>
  );
};
