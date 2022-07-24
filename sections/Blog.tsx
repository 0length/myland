import { Client } from "@notionhq/client"
import React, { useEffect, useState } from "react"
import { FadeStatus } from "../pages"
export type PageWithData = {fadeStatus: FadeStatus, data: any}
export const Blog = ({fadeStatus, data="Cooming Soon!"}: PageWithData)=>{

    return <div className={fadeStatus} style={{display:"flex", alignContent: "center", justifyContent: "center", height:"100%",width: "100%"}} >
<span>

{
    JSON.stringify(data)
}
</span>
    </div>
}