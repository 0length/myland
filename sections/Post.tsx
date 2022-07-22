import { Client } from "@notionhq/client"
import React, { useEffect, useState } from "react"
import { FadeStatus } from "../pages"

(String.prototype as any).insert = function(index: number, string: string) {
    if (index > 0) {
      return this.substring(0, index) + string + this.substr(index);
    }
  
    return string + this;
  };
  // @ts-ignore
const toPageID = (string: string)=>string.insert(8, "-").insert(13, "-").insert(18,"-").insert(23,"-");
export const Post = ({fadeStatus}: {fadeStatus: FadeStatus})=>{
    const [topLang, setTopLang ] = useState()
    const fetchContent = async ()=>{
        const page_id = toPageID(location.pathname.split("/post/")[1].split("-")[1]);
        console.log(page_id);

        const auth= process.env.NOTION_TOKEN || "secret_KqlbkdS08YJ1y9U4u2HAUrzmIty4Ve023OZp87yuSXw";
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
          console.log( this.responseText)
          };
          xhttp.open("GET", "https://api.notion.com/v1/pages/"+page_id, true);
          xhttp.setRequestHeader("Authorization", "Bearer " + auth);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.setRequestHeader("Notion-Version", "2021-05-13");
        
          xhttp.send(JSON.stringify({}))
        // const data = await notion.pages.retrieve({page_id})
        // console.log(data, page_id);
    }
    useEffect(()=>{
        fetchContent();
    }, []);
    
    return <div className={fadeStatus} style={{display:"flex", alignContent: "center", flexDirection: "column", justifyContent: "center", height:"100%",width: "100%"}} >

    </div>
}