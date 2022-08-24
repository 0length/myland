import { PageWithData } from "./Blog";
import { useEffect, useState } from "react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";
import { unified } from "unified";
import Head from "next/head";
import { Contribution } from "./Contribution";
import { motion } from "framer-motion";

export const retrieveReadme = async () => {
  const md = await await (
    await fetch(
      "https://raw.githubusercontent.com/0length/0length/main/README.md"
    )
  ).text();
  const matterResult = matter(md);
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeFormat)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(matterResult.content);

  return processedContent.toString();
};
export const About = ({ fadeStatus, data }: PageWithData) => {
  const [readme, setReadme] = useState(data);

  const handleReadme = async () => {
    setReadme(await retrieveReadme());
  };

  useEffect(() => {
    handleReadme();
  }, []);

  return (
    <>
      <Head>
        <title>{"About Me"}</title>
        <meta name="description" content="About me and how to contact me." />
        <style>{
          `
          section {
            padding: 100px 0;
          }
          `
          }</style>
      </Head>
      <div className="avatar">
        <motion.img
          className={fadeStatus}
          style={{ borderRadius: "50% 50%" }}
          alt=""
          width="260"
          height="260"
          initial={{border: "0px solid rgba(157,219,251, 1)"}}
          src="https://avatars.githubusercontent.com/u/31953472?v=4"
          animate={{border:"6px solid rgba(157,219,251, 0.4)", transitionDelay: "1s", transitionTimingFunction:"ease-in-out"}}
        />
      </div>
      <div
        className={fadeStatus}
        dangerouslySetInnerHTML={{ __html: readme }}
        style={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
        }}
      ></div>
          <Contribution fadeStatus={fadeStatus} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          width: "100%",
        }}
      ></div>
    </>
  );
};
