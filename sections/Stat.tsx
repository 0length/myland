import React, { useEffect, useState } from "react"
import { FadeStatus } from "../pages"

export const Stat = ({fadeStatus}: {fadeStatus: FadeStatus})=>{
    const [topLang, setTopLang ] = useState(`
   
    <svg
    height="100%" width="100%" 
    viewBox="0 0 350 215"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="descId"
  >
    <title id="titleId"></title>
    <desc id="descId"></desc>
    <style>
      .header {
        font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
        fill: #70a5fd;
        animation: fadeInAnimation 0.8s ease-in-out forwards;
      }
      @supports(-moz-appearance: auto) {
        /* Selector detects Firefox */
        .header { font-size: 15.5px; }
      }
      .lang-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: #38bdae }

      
/* Animations */
@keyframes scaleInAnimation {
  from {
    transform: translate(-5px, 5px) scale(0);
  }
  to {
    transform: translate(-5px, 5px) scale(1);
  }
}
@keyframes fadeInAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

      * { animation-duration: 0s !important; animation-delay: 0s !important; }
    </style>

    

    <rect
      data-testid="card-bg"
      x="0.5"
      y="0.5"
      rx="4.5"
      height="99%"
      stroke="#e4e2e2"
      width="349"
      fill="#1a1b27"
      stroke-opacity="0"
    />

    
  <g
    data-testid="card-title"
    transform="translate(25, 35)"
  >
    <g transform="translate(0, 0)">
  <text
    x="0"
    y="0"
    class="header"
    data-testid="header"
  >Most Used Languages</text>
</g>
  </g>


    <g
      data-testid="main-card-body"
      transform="translate(0, 55)"
    >
      
<svg data-testid="lang-items" x="25">
  
<mask id="rect-mask">
  <rect x="0" y="0" width="300" height="8" fill="white" rx="5" />
</mask>

    <rect
      mask="url(#rect-mask)"
      data-testid="lang-progress"
      x="0"
      y="0"
      width="102.81"
      height="8"
      fill="#e34c26"
    />
  
    <rect
      mask="url(#rect-mask)"
      data-testid="lang-progress"
      x="102.81"
      y="0"
      width="62.78"
      height="8"
      fill="#3178c6"
    />
  
    <rect
      mask="url(#rect-mask)"
      data-testid="lang-progress"
      x="165.59"
      y="0"
      width="56.89"
      height="8"
      fill="#4F5D95"
    />
  
    <rect
      mask="url(#rect-mask)"
      data-testid="lang-progress"
      x="222.48000000000002"
      y="0"
      width="43.25"
      height="8"
      fill="#A97BFF"
    />
  
    <rect
      mask="url(#rect-mask)"
      data-testid="lang-progress"
      x="265.73"
      y="0"
      width="12.92"
      height="8"
      fill="#563d7c"
    />
  
    <rect
      mask="url(#rect-mask)"
      data-testid="lang-progress"
      x="278.65000000000003"
      y="0"
      width="19.28"
      height="8"
      fill="#b07219"
    />
  
    <rect
      mask="url(#rect-mask)"
      data-testid="lang-progress"
      x="287.93"
      y="0"
      width="19.23"
      height="8"
      fill="#f1e05a"
    />
  
    <rect
      mask="url(#rect-mask)"
      data-testid="lang-progress"
      x="297.16"
      y="0"
      width="11.51"
      height="8"
      fill="#384d54"
    />
  
    <rect
      mask="url(#rect-mask)"
      data-testid="lang-progress"
      x="298.67"
      y="0"
      width="10.9"
      height="8"
      fill="#438eff"
    />
  
    <rect
      mask="url(#rect-mask)"
      data-testid="lang-progress"
      x="299.57"
      y="0"
      width="10.43"
      height="8"
      fill="#89e051"
    />
  

<g transform="translate(0, 25)">
  <g transform="translate(0, 0)"><g transform="translate(0, 0)">
<g>
  <circle cx="5" cy="6" r="5" fill="#e34c26" />
  <text data-testid="lang-name" x="15" y="10" class='lang-name'>
    HTML 34.27%
  </text>
</g>
</g><g transform="translate(0, 25)">
<g>
  <circle cx="5" cy="6" r="5" fill="#3178c6" />
  <text data-testid="lang-name" x="15" y="10" class='lang-name'>
    TypeScript 20.93%
  </text>
</g>
</g><g transform="translate(0, 50)">
<g>
  <circle cx="5" cy="6" r="5" fill="#4F5D95" />
  <text data-testid="lang-name" x="15" y="10" class='lang-name'>
    PHP 18.96%
  </text>
</g>
</g><g transform="translate(0, 75)">
<g>
  <circle cx="5" cy="6" r="5" fill="#A97BFF" />
  <text data-testid="lang-name" x="15" y="10" class='lang-name'>
    Kotlin 14.42%
  </text>
</g>
</g><g transform="translate(0, 100)">
<g>
  <circle cx="5" cy="6" r="5" fill="#563d7c" />
  <text data-testid="lang-name" x="15" y="10" class='lang-name'>
    CSS 4.31%
  </text>
</g>
</g></g><g transform="translate(150, 0)"><g transform="translate(0, 0)">
<g>
  <circle cx="5" cy="6" r="5" fill="#b07219" />
  <text data-testid="lang-name" x="15" y="10" class='lang-name'>
    Java 3.09%
  </text>
</g>
</g><g transform="translate(0, 25)">
<g>
  <circle cx="5" cy="6" r="5" fill="#f1e05a" />
  <text data-testid="lang-name" x="15" y="10" class='lang-name'>
    JavaScript 3.08%
  </text>
</g>
</g><g transform="translate(0, 50)">
<g>
  <circle cx="5" cy="6" r="5" fill="#384d54" />
  <text data-testid="lang-name" x="15" y="10" class='lang-name'>
    Dockerfile 0.50%
  </text>
</g>
</g><g transform="translate(0, 75)">
<g>
  <circle cx="5" cy="6" r="5" fill="#438eff" />
  <text data-testid="lang-name" x="15" y="10" class='lang-name'>
    Objective-C 0.30%
  </text>
</g>
</g><g transform="translate(0, 100)">
<g>
  <circle cx="5" cy="6" r="5" fill="#89e051" />
  <text data-testid="lang-name" x="15" y="10" class='lang-name'>
    Shell 0.14%
  </text>
</g>
</g></g>
</g>

</svg>

    </g>
  </svg>

  `)

    return <div className={fadeStatus} style={{display:"flex", alignContent: "center", justifyContent: "center", height:"100%",width: "100%"}} dangerouslySetInnerHTML={{__html: topLang}}></div>
}