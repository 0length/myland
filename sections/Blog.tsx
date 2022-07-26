import { Client } from "@notionhq/client"
import React, { useEffect, useState } from "react"
import { FadeStatus } from "../pages"
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css"; // only needed for code highlighting
import { NotionRenderer } from "react-notion";

export type PageWithData = {fadeStatus: FadeStatus, data: any}

  
export const Blog = ({fadeStatus, data}: PageWithData)=>{

    return <div className={fadeStatus} style={{display:"flex", flexDirection: "column", alignItems: "center",justifyContent: "center",width: "100%"}} >

{!data?<span style={{alignSelf: "center"}}>{"Cooming Soon!"}</span>:<>
<div className="notion-cover" style={{background: `url('${data.page.cover.external.url}') no-repeat center center fixed`}}>
    </div>
<NotionRenderer blockMap={data.content} />
</>
}

    </div>
}


