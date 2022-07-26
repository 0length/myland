import { PageWithData } from './Blog';
import { useEffect, useState } from 'react';
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import matter from 'gray-matter';
import { unified } from 'unified'

export const retrieveReadme = async ()=>{
    const md = await (await (await fetch("https://raw.githubusercontent.com/0length/0length/main/README.md")).text());
    const matterResult = matter(md);
    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeFormat)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(matterResult.content);

    return processedContent.toString();
}
export const About = ({ fadeStatus,data }: PageWithData) => {
    const [readme, setReadme ]=useState(data);

    const handleReadme = async ()=>{
        setReadme(await retrieveReadme())
    }

useEffect(()=>{
    handleReadme();
}, []);

    return <>
    <div className="avatar">
        <img style={{borderRadius: "50% 50%"}} alt="" width="260" height="260" src="https://avatars.githubusercontent.com/u/31953472?v=4"/>
        </div>
        <div className={fadeStatus} dangerouslySetInnerHTML={{__html: readme}} style={{ display: "flex",flexDirection:"column", alignItems: "center", justifyContent: "center", width: "100%" }}>
        </div>
        <div style={{ display: "flex",flexDirection:"column", alignContent: "center", justifyContent: "center", width: "100%" }}>
        </div>
    </>
}

