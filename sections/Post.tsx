import { Client } from "@notionhq/client"
import React, { useEffect, useState } from "react"
import { FadeStatus } from "../pages"

export const Post = ({fadeStatus, data}: {fadeStatus: FadeStatus, data: any})=>{

    return <div className={fadeStatus} style={{display:"flex", alignContent: "center", flexDirection: "column", justifyContent: "center", height:"100%",width: "100%"}} >
{
    JSON.stringify(data)
}
    </div>
}