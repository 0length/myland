import React from "react"
import { FadeStatus } from "../pages"

export const Stat = ({ fadeStatus }: { fadeStatus: FadeStatus }) => {

  return <div className={"stats "+fadeStatus} style={{ display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: "center", height: "120%", width: "100%", padding: "10% 10%" }}>
       <h2 className={(" " + fadeStatus)}>
               Github Statistic
        </h2>
    <img width={"50%"} className={fadeStatus}  src="https://github-readme-stats.vercel.app/api?username=0length&show_icons=true&theme=tokyonight" />
    <img width={"50%"} className={fadeStatus}  src="https://github-readme-stats.vercel.app/api/top-langs/?username=0length&langs_count=10&layout=compact&theme=tokyonight" />
  </div>
}