<!-- =========================================================
     NOVA — INTERPRETABLE CONVERSATIONAL RETRIEVAL ENGINE
     ========================================================= -->

<div align="center">
  
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 440" width="1200" height="440" role="img" aria-label="NOVA - interpretable conversational retrieval engine">

  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#08090D"/><stop offset="48%" stop-color="#141230"/>
      <stop offset="100%" stop-color="#241C5A"/>
    </linearGradient>
    <radialGradient id="bloom" cx="50%" cy="34%" r="52%">
      <stop offset="0%" stop-color="#0D0B24" stop-opacity="0.92"/>
      <stop offset="60%" stop-color="#120F2E" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#120F2E" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="shimmer" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="520" y2="0" spreadMethod="repeat">
      <stop offset="0%" stop-color="#B9B2FF"/><stop offset="42%" stop-color="#FFFFFF"/>
      <stop offset="58%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#B9B2FF"/>
      <animateTransform attributeName="gradientTransform" type="translate" from="-520 0" to="0 0" dur="4.5s" repeatCount="indefinite"/>
    </linearGradient>
    <linearGradient id="scan" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#695CFE" stop-opacity="0"/>
      <stop offset="50%" stop-color="#695CFE" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#695CFE" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#695CFE" stop-opacity="0"/><stop offset="35%" stop-color="#695CFE"/>
      <stop offset="65%" stop-color="#42B3A5"/><stop offset="100%" stop-color="#42B3A5" stop-opacity="0"/>
    </linearGradient>
    <filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="15"/></filter>
    <filter id="barglow" x="-20%" y="-260%" width="140%" height="620%">
      <feGaussianBlur stdDeviation="3.5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <style>
      text  { font-family:'JetBrains Mono','Consolas','Courier New',monospace; }
      .mx   { font-size:11px; fill:#7B6BFF; }
      .cap  { font-size:10.5px; letter-spacing:3.2px; fill:#6A6499; }
      .qry  { font-size:14.5px; fill:#D6D3F0; }
      .tok  { font-size:12px; fill:#A79EFF; }
      .vec  { font-size:12.5px; fill:#42B3A5; }
      .lbl  { font-size:12px; fill:#9B95C9; }
      .val  { font-size:11.5px; }
      .hdr  { font-size:10.5px; letter-spacing:2.4px; fill:#6A6499; }
      .row  { font-size:13px; fill:#A9A3D8; }
      .note { font-size:11.5px; }
      .ans  { font-size:16px; fill:#E4E2F5; font-style:italic;
               font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif; }
      .badge{ font-size:10.5px; letter-spacing:2px; fill:#4ADE80; }
    </style>
  </defs>

  <rect width="1200" height="440" fill="url(#bg)"/>

  <g class="mx" opacity="0.9">
    <text x="20" y="34">0.55<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.1s" begin="2.4s" repeatCount="indefinite"/></text>
    <text x="66" y="34">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.3s" begin="2.2s" repeatCount="indefinite"/></text>
    <text x="112" y="34">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.8s" begin="3.7s" repeatCount="indefinite"/></text>
    <text x="158" y="34">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="7.1s" begin="1.9s" repeatCount="indefinite"/></text>
    <text x="204" y="34">0.72<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.5s" begin="2.9s" repeatCount="indefinite"/></text>
    <text x="250" y="34">0.86<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.2s" begin="0.1s" repeatCount="indefinite"/></text>
    <text x="296" y="34">0.62<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.5s" begin="2.1s" repeatCount="indefinite"/></text>
    <text x="342" y="34">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.0s" begin="3.6s" repeatCount="indefinite"/></text>
    <text x="388" y="34">0.66<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.7s" begin="2.6s" repeatCount="indefinite"/></text>
    <text x="434" y="34">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.3s" begin="0.1s" repeatCount="indefinite"/></text>
    <text x="480" y="34">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="7.1s" begin="1.3s" repeatCount="indefinite"/></text>
    <text x="526" y="34">0.56<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.1s" begin="1.6s" repeatCount="indefinite"/></text>
    <text x="572" y="34">0.61<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.0s" begin="3.0s" repeatCount="indefinite"/></text>
    <text x="618" y="34">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.1s" begin="0.3s" repeatCount="indefinite"/></text>
    <text x="664" y="34">0.60<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.2s" begin="1.6s" repeatCount="indefinite"/></text>
    <text x="710" y="34">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.4s" begin="0.7s" repeatCount="indefinite"/></text>
    <text x="756" y="34">0.87<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.5s" begin="0.6s" repeatCount="indefinite"/></text>
    <text x="802" y="34">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.1s" begin="2.7s" repeatCount="indefinite"/></text>
    <text x="848" y="34">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.3s" begin="2.6s" repeatCount="indefinite"/></text>
    <text x="894" y="34">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.5s" begin="3.2s" repeatCount="indefinite"/></text>
    <text x="940" y="34">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.0s" begin="1.9s" repeatCount="indefinite"/></text>
    <text x="986" y="34">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.2s" begin="1.7s" repeatCount="indefinite"/></text>
    <text x="1032" y="34">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="7.3s" begin="2.1s" repeatCount="indefinite"/></text>
    <text x="1078" y="34">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.4s" begin="2.2s" repeatCount="indefinite"/></text>
    <text x="1124" y="34">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.1s" begin="0.1s" repeatCount="indefinite"/></text>
    <text x="1170" y="34">0.81<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.3s" begin="2.7s" repeatCount="indefinite"/></text>
    <text x="20" y="60">0.73<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.1s" begin="0.8s" repeatCount="indefinite"/></text>
    <text x="66" y="60">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="7.2s" begin="3.7s" repeatCount="indefinite"/></text>
    <text x="112" y="60">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.5s" begin="2.0s" repeatCount="indefinite"/></text>
    <text x="158" y="60">0.61<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.9s" begin="1.9s" repeatCount="indefinite"/></text>
    <text x="204" y="60">0.60<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.2s" begin="0.8s" repeatCount="indefinite"/></text>
    <text x="250" y="60">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.5s" begin="3.6s" repeatCount="indefinite"/></text>
    <text x="296" y="60">0.90<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.3s" begin="2.7s" repeatCount="indefinite"/></text>
    <text x="342" y="60">0.66<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.3s" begin="0.6s" repeatCount="indefinite"/></text>
    <text x="388" y="60">0.95<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.1s" begin="3.3s" repeatCount="indefinite"/></text>
    <text x="434" y="60">1.00<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.1s" begin="3.0s" repeatCount="indefinite"/></text>
    <text x="480" y="60">0.69<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.3s" begin="0.1s" repeatCount="indefinite"/></text>
    <text x="526" y="60">0.63<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.6s" begin="1.8s" repeatCount="indefinite"/></text>
    <text x="572" y="60">0.80<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.1s" begin="0.8s" repeatCount="indefinite"/></text>
    <text x="618" y="60">0.84<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.6s" begin="2.1s" repeatCount="indefinite"/></text>
    <text x="664" y="60">0.71<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.2s" begin="3.5s" repeatCount="indefinite"/></text>
    <text x="710" y="60">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.7s" begin="1.7s" repeatCount="indefinite"/></text>
    <text x="756" y="60">0.68<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.4s" begin="1.9s" repeatCount="indefinite"/></text>
    <text x="802" y="60">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.2s" begin="3.6s" repeatCount="indefinite"/></text>
    <text x="848" y="60">0.53<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.3s" begin="1.0s" repeatCount="indefinite"/></text>
    <text x="894" y="60">0.65<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.9s" begin="2.1s" repeatCount="indefinite"/></text>
    <text x="940" y="60">0.98<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.9s" begin="3.3s" repeatCount="indefinite"/></text>
    <text x="986" y="60">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.7s" begin="3.2s" repeatCount="indefinite"/></text>
    <text x="1032" y="60">0.74<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.0s" begin="0.5s" repeatCount="indefinite"/></text>
    <text x="1078" y="60">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.3s" begin="1.6s" repeatCount="indefinite"/></text>
    <text x="1124" y="60">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.8s" begin="3.3s" repeatCount="indefinite"/></text>
    <text x="1170" y="60">0.65<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.6s" begin="3.5s" repeatCount="indefinite"/></text>
    <text x="20" y="86">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.3s" begin="2.3s" repeatCount="indefinite"/></text>
    <text x="66" y="86">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.9s" begin="2.9s" repeatCount="indefinite"/></text>
    <text x="112" y="86">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.3s" begin="2.0s" repeatCount="indefinite"/></text>
    <text x="158" y="86">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.4s" begin="3.3s" repeatCount="indefinite"/></text>
    <text x="204" y="86">0.54<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.5s" begin="0.0s" repeatCount="indefinite"/></text>
    <text x="250" y="86">0.53<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.0s" begin="3.0s" repeatCount="indefinite"/></text>
    <text x="296" y="86">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.3s" begin="3.8s" repeatCount="indefinite"/></text>
    <text x="342" y="86">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.6s" begin="0.8s" repeatCount="indefinite"/></text>
    <text x="388" y="86">0.67<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.5s" begin="2.5s" repeatCount="indefinite"/></text>
    <text x="434" y="86">0.88<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.7s" begin="2.4s" repeatCount="indefinite"/></text>
    <text x="480" y="86">0.90<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.4s" begin="3.1s" repeatCount="indefinite"/></text>
    <text x="526" y="86">0.88<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.8s" begin="0.8s" repeatCount="indefinite"/></text>
    <text x="572" y="86">0.68<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.9s" begin="1.2s" repeatCount="indefinite"/></text>
    <text x="618" y="86">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.7s" begin="3.3s" repeatCount="indefinite"/></text>
    <text x="664" y="86">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.1s" begin="1.0s" repeatCount="indefinite"/></text>
    <text x="710" y="86">0.72<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.7s" begin="1.1s" repeatCount="indefinite"/></text>
    <text x="756" y="86">0.62<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.4s" begin="2.8s" repeatCount="indefinite"/></text>
    <text x="802" y="86">0.62<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.5s" begin="3.6s" repeatCount="indefinite"/></text>
    <text x="848" y="86">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.5s" begin="3.3s" repeatCount="indefinite"/></text>
    <text x="894" y="86">0.76<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.2s" begin="1.3s" repeatCount="indefinite"/></text>
    <text x="940" y="86">0.89<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.5s" begin="3.8s" repeatCount="indefinite"/></text>
    <text x="986" y="86">0.99<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.0s" begin="2.7s" repeatCount="indefinite"/></text>
    <text x="1032" y="86">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="7.1s" begin="2.9s" repeatCount="indefinite"/></text>
    <text x="1078" y="86">0.51<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.8s" begin="0.4s" repeatCount="indefinite"/></text>
    <text x="1124" y="86">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.8s" begin="2.8s" repeatCount="indefinite"/></text>
    <text x="1170" y="86">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.2s" begin="1.1s" repeatCount="indefinite"/></text>
    <text x="20" y="112">0.58<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.0s" begin="1.6s" repeatCount="indefinite"/></text>
    <text x="66" y="112">0.76<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.2s" begin="1.1s" repeatCount="indefinite"/></text>
    <text x="112" y="112">0.62<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.9s" begin="1.9s" repeatCount="indefinite"/></text>
    <text x="158" y="112">0.82<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.4s" begin="1.4s" repeatCount="indefinite"/></text>
    <text x="204" y="112">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="7.0s" begin="1.3s" repeatCount="indefinite"/></text>
    <text x="250" y="112">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.1s" begin="3.7s" repeatCount="indefinite"/></text>
    <text x="296" y="112">0.44<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.2s" begin="3.1s" repeatCount="indefinite"/></text>
    <text x="342" y="112">0.44<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.5s" begin="2.4s" repeatCount="indefinite"/></text>
    <text x="388" y="112">0.83<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.9s" begin="3.6s" repeatCount="indefinite"/></text>
    <text x="434" y="112">0.57<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.0s" begin="0.9s" repeatCount="indefinite"/></text>
    <text x="480" y="112">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.9s" begin="3.0s" repeatCount="indefinite"/></text>
    <text x="526" y="112">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.5s" begin="2.7s" repeatCount="indefinite"/></text>
    <text x="572" y="112">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="7.4s" begin="2.1s" repeatCount="indefinite"/></text>
    <text x="618" y="112">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.2s" begin="2.9s" repeatCount="indefinite"/></text>
    <text x="664" y="112">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.4s" begin="1.8s" repeatCount="indefinite"/></text>
    <text x="710" y="112">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.6s" begin="1.3s" repeatCount="indefinite"/></text>
    <text x="756" y="112">0.83<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.7s" begin="1.0s" repeatCount="indefinite"/></text>
    <text x="802" y="112">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.4s" begin="2.3s" repeatCount="indefinite"/></text>
    <text x="848" y="112">0.73<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.1s" begin="1.3s" repeatCount="indefinite"/></text>
    <text x="894" y="112">0.45<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.0s" begin="2.8s" repeatCount="indefinite"/></text>
    <text x="940" y="112">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.2s" begin="0.3s" repeatCount="indefinite"/></text>
    <text x="986" y="112">0.61<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.4s" begin="0.4s" repeatCount="indefinite"/></text>
    <text x="1032" y="112">0.61<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.1s" begin="3.4s" repeatCount="indefinite"/></text>
    <text x="1078" y="112">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.1s" begin="2.8s" repeatCount="indefinite"/></text>
    <text x="1124" y="112">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.7s" begin="3.5s" repeatCount="indefinite"/></text>
    <text x="1170" y="112">0.49<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.9s" begin="0.1s" repeatCount="indefinite"/></text>
    <text x="20" y="138">0.91<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.2s" begin="0.5s" repeatCount="indefinite"/></text>
    <text x="66" y="138">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.1s" begin="1.7s" repeatCount="indefinite"/></text>
    <text x="112" y="138">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.9s" begin="2.7s" repeatCount="indefinite"/></text>
    <text x="158" y="138">0.68<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.4s" begin="3.5s" repeatCount="indefinite"/></text>
    <text x="204" y="138">0.78<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.2s" begin="1.7s" repeatCount="indefinite"/></text>
    <text x="250" y="138">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.6s" begin="2.7s" repeatCount="indefinite"/></text>
    <text x="296" y="138">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.5s" begin="3.5s" repeatCount="indefinite"/></text>
    <text x="342" y="138">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.3s" begin="0.4s" repeatCount="indefinite"/></text>
    <text x="388" y="138">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.0s" begin="2.0s" repeatCount="indefinite"/></text>
    <text x="434" y="138">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="7.1s" begin="2.0s" repeatCount="indefinite"/></text>
    <text x="480" y="138">0.63<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.0s" begin="4.0s" repeatCount="indefinite"/></text>
    <text x="526" y="138">0.83<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.4s" begin="2.8s" repeatCount="indefinite"/></text>
    <text x="572" y="138">0.75<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.3s" begin="1.4s" repeatCount="indefinite"/></text>
    <text x="618" y="138">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.0s" begin="3.0s" repeatCount="indefinite"/></text>
    <text x="664" y="138">0.48<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.2s" begin="3.4s" repeatCount="indefinite"/></text>
    <text x="710" y="138">0.47<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.1s" begin="1.4s" repeatCount="indefinite"/></text>
    <text x="756" y="138">0.99<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.7s" begin="0.4s" repeatCount="indefinite"/></text>
    <text x="802" y="138">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.0s" begin="3.8s" repeatCount="indefinite"/></text>
    <text x="848" y="138">0.56<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.4s" begin="2.1s" repeatCount="indefinite"/></text>
    <text x="894" y="138">0.68<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.2s" begin="1.9s" repeatCount="indefinite"/></text>
    <text x="940" y="138">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="7.4s" begin="2.0s" repeatCount="indefinite"/></text>
    <text x="986" y="138">0.98<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.5s" begin="1.4s" repeatCount="indefinite"/></text>
    <text x="1032" y="138">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.0s" begin="1.5s" repeatCount="indefinite"/></text>
    <text x="1078" y="138">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.4s" begin="3.5s" repeatCount="indefinite"/></text>
    <text x="1124" y="138">0.81<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.4s" begin="1.2s" repeatCount="indefinite"/></text>
    <text x="1170" y="138">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.7s" begin="3.9s" repeatCount="indefinite"/></text>
    <text x="20" y="164">0.57<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.4s" begin="3.6s" repeatCount="indefinite"/></text>
    <text x="66" y="164">0.75<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.2s" begin="1.8s" repeatCount="indefinite"/></text>
    <text x="112" y="164">0.76<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.7s" begin="1.3s" repeatCount="indefinite"/></text>
    <text x="158" y="164">0.85<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.2s" begin="3.6s" repeatCount="indefinite"/></text>
    <text x="204" y="164">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.1s" begin="0.4s" repeatCount="indefinite"/></text>
    <text x="250" y="164">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.0s" begin="3.5s" repeatCount="indefinite"/></text>
    <text x="296" y="164">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.5s" begin="3.4s" repeatCount="indefinite"/></text>
    <text x="342" y="164">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.1s" begin="0.1s" repeatCount="indefinite"/></text>
    <text x="388" y="164">0.67<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.4s" begin="1.2s" repeatCount="indefinite"/></text>
    <text x="434" y="164">0.61<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.8s" begin="2.6s" repeatCount="indefinite"/></text>
    <text x="480" y="164">0.69<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.8s" begin="1.7s" repeatCount="indefinite"/></text>
    <text x="526" y="164">0.65<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.9s" begin="3.9s" repeatCount="indefinite"/></text>
    <text x="572" y="164">0.99<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.8s" begin="0.4s" repeatCount="indefinite"/></text>
    <text x="618" y="164">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="7.0s" begin="3.9s" repeatCount="indefinite"/></text>
    <text x="664" y="164">0.60<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.2s" begin="3.9s" repeatCount="indefinite"/></text>
    <text x="710" y="164">0.75<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.1s" begin="1.0s" repeatCount="indefinite"/></text>
    <text x="756" y="164">0.96<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.1s" begin="0.5s" repeatCount="indefinite"/></text>
    <text x="802" y="164">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.0s" begin="1.8s" repeatCount="indefinite"/></text>
    <text x="848" y="164">0.69<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.6s" begin="3.0s" repeatCount="indefinite"/></text>
    <text x="894" y="164">0.76<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.5s" begin="1.0s" repeatCount="indefinite"/></text>
    <text x="940" y="164">0.48<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.2s" begin="1.1s" repeatCount="indefinite"/></text>
    <text x="986" y="164">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.1s" begin="1.7s" repeatCount="indefinite"/></text>
    <text x="1032" y="164">0.96<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.9s" begin="2.0s" repeatCount="indefinite"/></text>
    <text x="1078" y="164">0.66<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.6s" begin="1.9s" repeatCount="indefinite"/></text>
    <text x="1124" y="164">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.5s" begin="0.3s" repeatCount="indefinite"/></text>
    <text x="1170" y="164">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.8s" begin="2.3s" repeatCount="indefinite"/></text>
    <text x="20" y="190">0.94<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.8s" begin="3.2s" repeatCount="indefinite"/></text>
    <text x="66" y="190">0.71<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.5s" begin="2.5s" repeatCount="indefinite"/></text>
    <text x="112" y="190">0.92<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.4s" begin="1.5s" repeatCount="indefinite"/></text>
    <text x="158" y="190">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.9s" begin="1.0s" repeatCount="indefinite"/></text>
    <text x="204" y="190">0.73<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.0s" begin="3.6s" repeatCount="indefinite"/></text>
    <text x="250" y="190">0.60<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.8s" begin="2.3s" repeatCount="indefinite"/></text>
    <text x="296" y="190">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.1s" begin="4.0s" repeatCount="indefinite"/></text>
    <text x="342" y="190">0.68<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.8s" begin="3.5s" repeatCount="indefinite"/></text>
    <text x="388" y="190">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.4s" begin="2.7s" repeatCount="indefinite"/></text>
    <text x="434" y="190">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.8s" begin="1.2s" repeatCount="indefinite"/></text>
    <text x="480" y="190">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="7.4s" begin="0.1s" repeatCount="indefinite"/></text>
    <text x="526" y="190">0.89<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.4s" begin="0.2s" repeatCount="indefinite"/></text>
    <text x="572" y="190">0.73<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.2s" begin="0.0s" repeatCount="indefinite"/></text>
    <text x="618" y="190">0.83<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.2s" begin="1.8s" repeatCount="indefinite"/></text>
    <text x="664" y="190">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.3s" begin="0.9s" repeatCount="indefinite"/></text>
    <text x="710" y="190">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.4s" begin="0.4s" repeatCount="indefinite"/></text>
    <text x="756" y="190">0.86<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.3s" begin="2.6s" repeatCount="indefinite"/></text>
    <text x="802" y="190">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.6s" begin="0.1s" repeatCount="indefinite"/></text>
    <text x="848" y="190">0.55<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.0s" begin="3.5s" repeatCount="indefinite"/></text>
    <text x="894" y="190">0.75<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.1s" begin="2.0s" repeatCount="indefinite"/></text>
    <text x="940" y="190">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.9s" begin="3.9s" repeatCount="indefinite"/></text>
    <text x="986" y="190">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.6s" begin="2.5s" repeatCount="indefinite"/></text>
    <text x="1032" y="190">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.4s" begin="1.0s" repeatCount="indefinite"/></text>
    <text x="1078" y="190">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.2s" begin="3.5s" repeatCount="indefinite"/></text>
    <text x="1124" y="190">0.46<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.0s" begin="1.6s" repeatCount="indefinite"/></text>
    <text x="1170" y="190">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.2s" begin="3.0s" repeatCount="indefinite"/></text>
    <text x="20" y="216">0.84<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.0s" begin="0.4s" repeatCount="indefinite"/></text>
    <text x="66" y="216">0.68<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.1s" begin="3.7s" repeatCount="indefinite"/></text>
    <text x="112" y="216">0.48<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.0s" begin="0.9s" repeatCount="indefinite"/></text>
    <text x="158" y="216">0.59<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.4s" begin="3.1s" repeatCount="indefinite"/></text>
    <text x="204" y="216">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.4s" begin="3.4s" repeatCount="indefinite"/></text>
    <text x="250" y="216">0.67<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.6s" begin="0.8s" repeatCount="indefinite"/></text>
    <text x="296" y="216">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.5s" begin="1.3s" repeatCount="indefinite"/></text>
    <text x="342" y="216">0.87<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.1s" begin="0.6s" repeatCount="indefinite"/></text>
    <text x="388" y="216">0.64<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.5s" begin="1.9s" repeatCount="indefinite"/></text>
    <text x="434" y="216">0.86<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.4s" begin="3.9s" repeatCount="indefinite"/></text>
    <text x="480" y="216">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.0s" begin="0.8s" repeatCount="indefinite"/></text>
    <text x="526" y="216">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="7.5s" begin="1.9s" repeatCount="indefinite"/></text>
    <text x="572" y="216">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.5s" begin="1.7s" repeatCount="indefinite"/></text>
    <text x="618" y="216">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.5s" begin="3.4s" repeatCount="indefinite"/></text>
    <text x="664" y="216">0.97<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.7s" begin="3.5s" repeatCount="indefinite"/></text>
    <text x="710" y="216">0.91<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.7s" begin="0.8s" repeatCount="indefinite"/></text>
    <text x="756" y="216">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.0s" begin="3.9s" repeatCount="indefinite"/></text>
    <text x="802" y="216">0.74<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.0s" begin="2.3s" repeatCount="indefinite"/></text>
    <text x="848" y="216">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.7s" begin="0.7s" repeatCount="indefinite"/></text>
    <text x="894" y="216">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.7s" begin="3.7s" repeatCount="indefinite"/></text>
    <text x="940" y="216">0.81<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.6s" begin="1.7s" repeatCount="indefinite"/></text>
    <text x="986" y="216">0.45<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.0s" begin="2.9s" repeatCount="indefinite"/></text>
    <text x="1032" y="216">0.91<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.6s" begin="0.5s" repeatCount="indefinite"/></text>
    <text x="1078" y="216">0.64<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.2s" begin="3.6s" repeatCount="indefinite"/></text>
    <text x="1124" y="216">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="7.0s" begin="3.9s" repeatCount="indefinite"/></text>
    <text x="1170" y="216">0.86<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.2s" begin="2.0s" repeatCount="indefinite"/></text>
    <text x="20" y="242">0.71<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.7s" begin="3.6s" repeatCount="indefinite"/></text>
    <text x="66" y="242">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.2s" begin="0.4s" repeatCount="indefinite"/></text>
    <text x="112" y="242">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.6s" begin="1.6s" repeatCount="indefinite"/></text>
    <text x="158" y="242">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.6s" begin="3.4s" repeatCount="indefinite"/></text>
    <text x="204" y="242">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.1s" begin="0.1s" repeatCount="indefinite"/></text>
    <text x="250" y="242">0.93<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.3s" begin="0.8s" repeatCount="indefinite"/></text>
    <text x="296" y="242">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.6s" begin="1.3s" repeatCount="indefinite"/></text>
    <text x="342" y="242">0.87<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.1s" begin="0.4s" repeatCount="indefinite"/></text>
    <text x="388" y="242">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.9s" begin="2.8s" repeatCount="indefinite"/></text>
    <text x="434" y="242">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.0s" begin="3.6s" repeatCount="indefinite"/></text>
    <text x="480" y="242">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="3.4s" begin="3.7s" repeatCount="indefinite"/></text>
    <text x="526" y="242">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.5s" begin="0.2s" repeatCount="indefinite"/></text>
    <text x="572" y="242">0.86<animate attributeName="opacity" values="0.17;0.43;0.17" dur="6.1s" begin="3.9s" repeatCount="indefinite"/></text>
    <text x="618" y="242">0.86<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.2s" begin="2.1s" repeatCount="indefinite"/></text>
    <text x="664" y="242">0.88<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.3s" begin="3.4s" repeatCount="indefinite"/></text>
    <text x="710" y="242">0.46<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.1s" begin="2.9s" repeatCount="indefinite"/></text>
    <text x="756" y="242">0.50<animate attributeName="opacity" values="0.17;0.43;0.17" dur="5.8s" begin="3.3s" repeatCount="indefinite"/></text>
    <text x="802" y="242">0.66<animate attributeName="opacity" values="0.17;0.43;0.17" dur="7.3s" begin="2.6s" repeatCount="indefinite"/></text>
    <text x="848" y="242">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.5s" begin="1.1s" repeatCount="indefinite"/></text>
    <text x="894" y="242">0.61<animate attributeName="opacity" values="0.17;0.43;0.17" dur="3.5s" begin="1.8s" repeatCount="indefinite"/></text>
    <text x="940" y="242">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.4s" begin="3.5s" repeatCount="indefinite"/></text>
    <text x="986" y="242">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="5.1s" begin="0.8s" repeatCount="indefinite"/></text>
    <text x="1032" y="242">0.97<animate attributeName="opacity" values="0.17;0.43;0.17" dur="4.0s" begin="2.5s" repeatCount="indefinite"/></text>
    <text x="1078" y="242">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.6s" begin="0.5s" repeatCount="indefinite"/></text>
    <text x="1124" y="242">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="6.7s" begin="2.4s" repeatCount="indefinite"/></text>
    <text x="1170" y="242">0.00<animate attributeName="opacity" values="0.07;0.18;0.07" dur="4.6s" begin="1.3s" repeatCount="indefinite"/></text>
  </g>

  <rect y="0" width="300" height="270" fill="url(#scan)">
    <animate attributeName="x" from="-300" to="1200" dur="9s" repeatCount="indefinite"/>
  </rect>

  <rect width="1200" height="440" fill="url(#bloom)"/>

  <g text-anchor="middle" font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif">
    <text x="600" y="152" font-size="94" font-weight="800" letter-spacing="16" fill="#695CFE" filter="url(#soft)">NOVA
      <animate attributeName="opacity" values="0.40;0.90;0.40" dur="5s" repeatCount="indefinite"/>
    </text>
    <text x="600" y="152" font-size="94" font-weight="800" letter-spacing="16" fill="url(#shimmer)">NOVA</text>
    <text x="600" y="188" font-size="14.5" letter-spacing="7" fill="#C6C1EE"
          font-family="'JetBrains Mono','Consolas',monospace">INTERPRETABLE CONVERSATIONAL RETRIEVAL ENGINE</text>
  </g>

  <rect x="330" y="208" width="540" height="1.6" fill="url(#rule)">
    <animate attributeName="opacity" values="0.35;1;0.35" dur="3.4s" repeatCount="indefinite"/>
  </rect>

  <circle cx="562" cy="236" r="3" fill="#3A3566"/>
  <circle cx="562" cy="236" r="3.6" fill="#695CFE" opacity="0">
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0.0000;0.0000;0.0080;0.2420;0.2540;1.0000" dur="20.0s" repeatCount="indefinite"/>
  </circle>
  <circle cx="588" cy="236" r="3" fill="#3A3566"/>
  <circle cx="588" cy="236" r="3.6" fill="#695CFE" opacity="0">
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0.0000;0.2460;0.2580;0.4920;0.5040;1.0000" dur="20.0s" repeatCount="indefinite"/>
  </circle>
  <circle cx="614" cy="236" r="3" fill="#3A3566"/>
  <circle cx="614" cy="236" r="3.6" fill="#695CFE" opacity="0">
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0.0000;0.4960;0.5080;0.7420;0.7540;1.0000" dur="20.0s" repeatCount="indefinite"/>
  </circle>
  <circle cx="640" cy="236" r="3" fill="#3A3566"/>
  <circle cx="640" cy="236" r="3.6" fill="#695CFE" opacity="0">
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0.0000;0.7460;0.7580;0.9920;1.0000;1.0000" dur="20.0s" repeatCount="indefinite"/>
  </circle>

  <g opacity="0">
    <animate attributeName="opacity" values="1;1;1;0;0" keyTimes="0.0000;0.0120;0.2280;0.2500;1.0000" dur="20.0s" repeatCount="indefinite"/>
    <text x="76" y="268" class="cap">QUERY</text>
    <text x="748" y="268" text-anchor="end" class="cap">CORPUS SIMILARITY</text>
    <text x="76" y="310" class="qry" fill="#695CFE">&#8250;</text>
    <text x="96" y="310" class="qry">comment agir pour le climat ?</text>
    <rect x="340" y="298" width="8" height="16" fill="#42B3A5"><animate attributeName="opacity" values="1;1;0;0" dur="1.1s" repeatCount="indefinite"/></rect>
    <g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.0550;0.0770;1.0000" dur="20.0s" repeatCount="indefinite"/>
      <rect x="96" y="336" width="72" height="23" rx="11.5" fill="#1B1940" stroke="#4B45A0"/>
      <text x="132" y="352" text-anchor="middle" class="tok">climat</text>
    </g>
    <g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.0710;0.0930;1.0000" dur="20.0s" repeatCount="indefinite"/>
      <rect x="186" y="336" width="72" height="23" rx="11.5" fill="#1B1940" stroke="#4B45A0"/>
      <text x="222" y="352" text-anchor="middle" class="tok">nation</text>
    </g>
    <g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.0870;0.1090;1.0000" dur="20.0s" repeatCount="indefinite"/>
      <rect x="276" y="336" width="54" height="23" rx="11.5" fill="#1B1940" stroke="#4B45A0"/>
      <text x="303" y="352" text-anchor="middle" class="tok">agir</text>
    </g>
    <text x="76" y="396" class="vec" opacity="0">[ 0.81  0.47  0.18  0.00  0.00  ... ]<animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.1150;0.1370;1.0000" dur="20.0s" repeatCount="indefinite"/></text>
    <text x="748" y="308" text-anchor="end" class="lbl">Macron</text>
    <rect x="762" y="300" width="300" height="9" rx="4.5" fill="#181633"/>
    <rect x="762" y="300" height="9" rx="4.5" fill="#695CFE" filter="url(#barglow)">
      <animate attributeName="width" values="0;0;246;246" keyTimes="0.0000;0.0450;0.1200;1.0000" dur="20.0s"
               repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;0.2 0.85 0.3 1;0 0 1 1"/>
    </rect>
    <text x="1076" y="308" class="val" fill="#695CFE" opacity="0">0.82<animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.0750;0.0970;1.0000" dur="20.0s" repeatCount="indefinite"/></text>
    <text x="748" y="338" text-anchor="end" class="lbl">Chirac</text>
    <rect x="762" y="330" width="300" height="9" rx="4.5" fill="#181633"/>
    <rect x="762" y="330" height="9" rx="4.5" fill="#5A67D8">
      <animate attributeName="width" values="0;0;138;138" keyTimes="0.0000;0.0610;0.1360;1.0000" dur="20.0s"
               repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;0.2 0.85 0.3 1;0 0 1 1"/>
    </rect>
    <text x="1076" y="338" class="val" fill="#5A67D8" opacity="0">0.46<animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.0910;0.1130;1.0000" dur="20.0s" repeatCount="indefinite"/></text>
    <text x="748" y="368" text-anchor="end" class="lbl">Mitterrand</text>
    <rect x="762" y="360" width="300" height="9" rx="4.5" fill="#181633"/>
    <rect x="762" y="360" height="9" rx="4.5" fill="#4A5AB8">
      <animate attributeName="width" values="0;0;102;102" keyTimes="0.0000;0.0770;0.1520;1.0000" dur="20.0s"
               repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;0.2 0.85 0.3 1;0 0 1 1"/>
    </rect>
    <text x="1076" y="368" class="val" fill="#4A5AB8" opacity="0">0.34<animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.1070;0.1290;1.0000" dur="20.0s" repeatCount="indefinite"/></text>
    <text x="748" y="398" text-anchor="end" class="lbl">Sarkozy</text>
    <rect x="762" y="390" width="300" height="9" rx="4.5" fill="#181633"/>
    <rect x="762" y="390" height="9" rx="4.5" fill="#3A4590">
      <animate attributeName="width" values="0;0;51;51" keyTimes="0.0000;0.0930;0.1680;1.0000" dur="20.0s"
               repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;0.2 0.85 0.3 1;0 0 1 1"/>
    </rect>
    <text x="1076" y="398" class="val" fill="#3A4590" opacity="0">0.17<animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.1230;0.1450;1.0000" dur="20.0s" repeatCount="indefinite"/></text>
  </g>
  <g opacity="0">
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0.0000;0.2500;0.2620;0.4780;0.5000;1.0000" dur="20.0s" repeatCount="indefinite"/>
    <text x="76" y="268" class="cap">QUERY</text>
    <text x="748" y="268" text-anchor="end" class="cap">CORPUS SIMILARITY</text>
    <text x="76" y="310" class="qry" fill="#695CFE">&#8250;</text>
    <text x="96" y="310" class="qry">quelle place pour l'Europe ?</text>
    <rect x="332" y="298" width="8" height="16" fill="#42B3A5"><animate attributeName="opacity" values="1;1;0;0" dur="1.1s" repeatCount="indefinite"/></rect>
    <g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.3050;0.3270;1.0000" dur="20.0s" repeatCount="indefinite"/>
      <rect x="96" y="336" width="72" height="23" rx="11.5" fill="#1B1940" stroke="#4B45A0"/>
      <text x="132" y="352" text-anchor="middle" class="tok">europe</text>
    </g>
    <g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.3210;0.3430;1.0000" dur="20.0s" repeatCount="indefinite"/>
      <rect x="186" y="336" width="63" height="23" rx="11.5" fill="#1B1940" stroke="#4B45A0"/>
      <text x="218" y="352" text-anchor="middle" class="tok">place</text>
    </g>
    <g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.3370;0.3590;1.0000" dur="20.0s" repeatCount="indefinite"/>
      <rect x="266" y="336" width="63" height="23" rx="11.5" fill="#1B1940" stroke="#4B45A0"/>
      <text x="298" y="352" text-anchor="middle" class="tok">union</text>
    </g>
    <text x="76" y="396" class="vec" opacity="0">[ 0.00  0.29  0.74  0.63  0.00  ... ]<animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.3650;0.3870;1.0000" dur="20.0s" repeatCount="indefinite"/></text>
    <text x="748" y="308" text-anchor="end" class="lbl">Mitterrand</text>
    <rect x="762" y="300" width="300" height="9" rx="4.5" fill="#181633"/>
    <rect x="762" y="300" height="9" rx="4.5" fill="#695CFE" filter="url(#barglow)">
      <animate attributeName="width" values="0;0;213;213" keyTimes="0.0000;0.2950;0.3700;1.0000" dur="20.0s"
               repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;0.2 0.85 0.3 1;0 0 1 1"/>
    </rect>
    <text x="1076" y="308" class="val" fill="#695CFE" opacity="0">0.71<animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.3250;0.3470;1.0000" dur="20.0s" repeatCount="indefinite"/></text>
    <text x="748" y="338" text-anchor="end" class="lbl">Chirac</text>
    <rect x="762" y="330" width="300" height="9" rx="4.5" fill="#181633"/>
    <rect x="762" y="330" height="9" rx="4.5" fill="#5A67D8">
      <animate attributeName="width" values="0;0;174;174" keyTimes="0.0000;0.3110;0.3860;1.0000" dur="20.0s"
               repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;0.2 0.85 0.3 1;0 0 1 1"/>
    </rect>
    <text x="1076" y="338" class="val" fill="#5A67D8" opacity="0">0.58<animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.3410;0.3630;1.0000" dur="20.0s" repeatCount="indefinite"/></text>
    <text x="748" y="368" text-anchor="end" class="lbl">Macron</text>
    <rect x="762" y="360" width="300" height="9" rx="4.5" fill="#181633"/>
    <rect x="762" y="360" height="9" rx="4.5" fill="#4A5AB8">
      <animate attributeName="width" values="0;0;123;123" keyTimes="0.0000;0.3270;0.4020;1.0000" dur="20.0s"
               repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;0.2 0.85 0.3 1;0 0 1 1"/>
    </rect>
    <text x="1076" y="368" class="val" fill="#4A5AB8" opacity="0">0.41<animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.3570;0.3790;1.0000" dur="20.0s" repeatCount="indefinite"/></text>
    <text x="748" y="398" text-anchor="end" class="lbl">Giscard</text>
    <rect x="762" y="390" width="300" height="9" rx="4.5" fill="#181633"/>
    <rect x="762" y="390" height="9" rx="4.5" fill="#3A4590">
      <animate attributeName="width" values="0;0;66;66" keyTimes="0.0000;0.3430;0.4180;1.0000" dur="20.0s"
               repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;0.2 0.85 0.3 1;0 0 1 1"/>
    </rect>
    <text x="1076" y="398" class="val" fill="#3A4590" opacity="0">0.22<animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.3730;0.3950;1.0000" dur="20.0s" repeatCount="indefinite"/></text>
  </g>
  <g opacity="0">
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0.0000;0.5000;0.5120;0.7280;0.7500;1.0000" dur="20.0s" repeatCount="indefinite"/>
    <text x="76" y="268" class="cap">TERM WEIGHTS &#183; TF &#215; IDF</text>
    <text x="1124" y="268" text-anchor="end" class="cap">NO STOP-WORD LIST REQUIRED</text>
    <text x="120" y="302" class="hdr">TERM</text>
    <text x="400" y="302" class="hdr" text-anchor="end">TF</text>
    <text x="540" y="302" class="hdr" text-anchor="end">IDF</text>
    <text x="700" y="302" class="hdr" text-anchor="end">WEIGHT</text>
    <line x1="110" y1="312" x2="1090" y2="312" stroke="#2B2850"/>
    <g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.5450;0.5670;1.0000" dur="20.0s" repeatCount="indefinite"/>
      <text x="120" y="342" class="row" fill="#D6D3F0">climat</text>
      <text x="400" y="342" class="row" text-anchor="end">0.014</text>
      <text x="540" y="342" class="row" text-anchor="end">0.602</text>
      <text x="700" y="342" class="row" text-anchor="end" fill="#42B3A5">0.0084</text>
      <text x="740" y="342" class="note" fill="#42B3A5">&#8592; rare &#183; topical</text>
    </g>
    <g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.5730;0.5950;1.0000" dur="20.0s" repeatCount="indefinite"/>
      <text x="120" y="374" class="row" fill="#D6D3F0">nation</text>
      <text x="400" y="374" class="row" text-anchor="end">0.021</text>
      <text x="540" y="374" class="row" text-anchor="end">0.301</text>
      <text x="700" y="374" class="row" text-anchor="end" fill="#8B85C0">0.0063</text>
      <text x="740" y="374" class="note" fill="#8B85C0">&#8592; moderately distinctive</text>
    </g>
    <g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.6010;0.6230;1.0000" dur="20.0s" repeatCount="indefinite"/>
      <text x="120" y="406" class="row" fill="#D6D3F0">le</text>
      <text x="400" y="406" class="row" text-anchor="end">0.058</text>
      <text x="540" y="406" class="row" text-anchor="end">0.000</text>
      <text x="700" y="406" class="row" text-anchor="end" fill="#E5C348">0.0000</text>
      <text x="740" y="406" class="note" fill="#E5C348">&#8592; idf = 0 &#183; eliminated</text>
    </g>
  </g>
  <g opacity="0">
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0.0000;0.7500;0.7620;0.9780;1.0000;1.0000" dur="20.0s" repeatCount="indefinite"/>
    <text x="76" y="268" class="cap">GROUNDED ANSWER</text>
    <text x="1124" y="268" text-anchor="end" class="cap">speeches/Macron.txt &#183; cos 0.82</text>
    <rect x="76" y="288" width="3" height="86" rx="1.5" fill="#42B3A5"/>
    <text x="102" y="318" class="ans" opacity="0">&#171; Le climat est notre combat commun, et il exige de chaque<animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.8000;0.8220;1.0000" dur="20.0s" repeatCount="indefinite"/></text>
    <text x="102" y="350" class="ans" opacity="0">&#171; nation un engagement imm&#233;diat et concret. &#187;<animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.8350;0.8570;1.0000" dur="20.0s" repeatCount="indefinite"/></text>
    <g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0.0000;0.8850;0.9070;1.0000" dur="20.0s" repeatCount="indefinite"/>
      <rect x="76" y="396" width="268" height="26" rx="13" fill="#0F2E23" stroke="#22C55E" stroke-opacity="0.55"/>
      <text x="210" y="413" text-anchor="middle" class="badge">&#10003; VERBATIM &#183; NOT GENERATED</text>
    </g>
  </g>

  <g>
    <animateTransform attributeName="transform" type="translate" from="-1200 0" to="0 0" dur="21s" repeatCount="indefinite"/>
    <path fill="#695CFE" opacity="0.13" transform="translate(0,424)"
          d="M0,0 q75,-13 150,0 t150,0 t150,0 t150,0 t150,0 t150,0 t150,0 t150,0 t150,0 t150,0 t150,0 t150,0 t150,0 t150,0 t150,0 t150,0 V40 H0 Z"/>
  </g>

</svg>




<img width="1200" height="440" alt="header (1)" src="https://github.com/user-attachments/assets/47cb8fe0-9909-498d-8a99-70f02abd10fc" />


<img src="assets/header.svg" width="100%" alt="NOVA — Interpretable Conversational Retrieval Engine">





<img
  src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=900&color=695CFE&center=true&vCenter=true&width=860&lines=FROM+WORDS+%E2%86%92+VECTORS;FROM+VECTORS+%E2%86%92+SIMILARITY;FROM+SIMILARITY+%E2%86%92+RELEVANT+INFORMATION;NO+BLACK+BOX.+EVERY+STEP+IS+INSPECTABLE."
  alt="NOVA pipeline"
/>

<br>

**A compact, fully interpretable NLP engine that turns a document corpus into a searchable vector space.**

*Built from scratch — no scikit-learn, no transformers, no hidden layers.*

<br>

<a href="https://github.com/eden2807/projetchatbotpythonL1/stargazers">
<img src="https://img.shields.io/github/stars/eden2807/projetchatbotpythonL1?style=for-the-badge&labelColor=0D1117&color=695CFE&logo=starship&logoColor=white" alt="Stars">
</a>
<a href="https://github.com/eden2807/projetchatbotpythonL1/network/members">
<img src="https://img.shields.io/github/forks/eden2807/projetchatbotpythonL1?style=for-the-badge&labelColor=0D1117&color=42B3A5&logo=git&logoColor=white" alt="Forks">
</a>
<a href="https://github.com/eden2807/projetchatbotpythonL1/commits">
<img src="https://img.shields.io/github/last-commit/eden2807/projetchatbotpythonL1?style=for-the-badge&labelColor=0D1117&color=E5C348&logo=github&logoColor=white" alt="Last commit">
</a>
<img src="https://img.shields.io/github/languages/code-size/eden2807/projetchatbotpythonL1?style=for-the-badge&labelColor=0D1117&color=8B5CF6" alt="Code size">
<img src="https://img.shields.io/badge/dependencies-0-22C55E?style=for-the-badge&labelColor=0D1117" alt="Zero dependencies">

<br>

<a href="#-00--overview"><img src="https://img.shields.io/badge/00-OVERVIEW-0D1117?style=for-the-badge&logo=readthedocs&logoColor=695CFE"></a>
<a href="#-01--architecture"><img src="https://img.shields.io/badge/01-ARCHITECTURE-0D1117?style=for-the-badge&logo=apachespark&logoColor=42B3A5"></a>
<a href="#-02--pipeline"><img src="https://img.shields.io/badge/02-PIPELINE-0D1117?style=for-the-badge&logo=databricks&logoColor=E5C348"></a>
<a href="#-03--the-mathematics"><img src="https://img.shields.io/badge/03-MATHEMATICS-0D1117?style=for-the-badge&logo=wolframmathematica&logoColor=FF6B6B"></a>
<a href="#-04--under-the-hood"><img src="https://img.shields.io/badge/04-INTERNALS-0D1117?style=for-the-badge&logo=gnubash&logoColor=8B5CF6"></a>
<a href="#-05--quickstart"><img src="https://img.shields.io/badge/05-QUICKSTART-0D1117?style=for-the-badge&logo=rocket&logoColor=22C55E"></a>

<br><br>

<img src="https://skillicons.dev/icons?i=python,git,github,vscode&theme=dark" alt="Tech stack">

<br>

<sub><code>PYTHON</code> · <code>NLP</code> · <code>INFORMATION RETRIEVAL</code> · <code>TF-IDF</code> · <code>COSINE SIMILARITY</code> · <code>VECTOR SPACE MODEL</code></sub>

</div>

<br>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%">

<br>

## 📖 Table of Contents

<table>
<tr>
<td valign="top" width="50%">

- [🛰 00 · Overview](#-00--overview)
- [🎬 Demo](#-demo)
- [🏗 01 · Architecture](#-01--architecture)
- [🌀 02 · Pipeline](#-02--pipeline)

</td>
<td valign="top" width="50%">

- [🧮 03 · The Mathematics](#-03--the-mathematics)
- [🔬 04 · Under the Hood](#-04--under-the-hood)
- [🚀 05 · Quickstart](#-05--quickstart)
- [🗺 Roadmap & FAQ](#-roadmap)

</td>
</tr>
</table>

<br>

---

## 🛰 00 · Overview

<table>
<tr>
<td width="58%" valign="top">

### Retrieval before generation.

**NOVA** is an *interpretable conversational retrieval engine* written in pure Python.

It ingests a corpus of French presidential speeches, converts language into numerical representations, compares a user's question against every document in the corpus, and returns a **real sentence from the best-matching source**.

The system deliberately follows a **classical information-retrieval approach** rather than a generative one. Every intermediate value — token, weight, vector, score — can be printed, plotted and audited.

> [!NOTE]
> NOVA does not *invent* answers. It *finds* them. Every output is traceable back to a specific sentence, in a specific speech, by a specific president.

</td>

<td width="42%" valign="top">

### ⚙️ System Card

```yaml
type:         Retrieval Engine
language:     Python 3.x
domain:       Natural Language Processing
model:        Vector Space Model
weighting:    TF-IDF (hand-rolled)
similarity:   Cosine
grounding:    Source-anchored
interface:    Tkinter
dependencies: none (stdlib only)
```

<br>

| | |
|:--|:--|
| **Status** | `● functional prototype` |
| **Principle** | `interpretability > complexity` |
| **Params** | `0 learned` |
| **Corpus** | `French presidential speeches` |

</td>
</tr>
</table>

<div align="right"><a href="#-table-of-contents"><sub>▲ back to top</sub></a></div>

---

## 🎬 Demo

<div align="center">

<img src="assets/demo.gif" width="720" alt="NOVA demo — ask a question, get a source-grounded answer">

<sub><i>Ask in natural language → NOVA ranks the corpus → returns the grounded sentence.</i></sub>

</div>

<br>

```console
$ python main.py

  ╔══════════════════════════════════════════════════════════╗
  ║  NOVA · interpretable retrieval console                  ║
  ╚══════════════════════════════════════════════════════════╝

  [ ✓ ] corpus loaded ............................ 8 documents
  [ ✓ ] preprocessing complete ................... 4 stages
  [ ✓ ] vocabulary built ......................... 12 431 terms
  [ ✓ ] TF-IDF matrix ............................ 12 431 × 8
  [ ✓ ] engine ready

  › Comment une nation peut-elle agir pour le climat ?

  ├─ query terms retained ......... climat · nation · agir
  ├─ best match ................... Macron        (cos = 0.82)
  ├─ pivot term ................... climat        (idf = 0.42)
  └─ source ...................... speeches/Macron.txt

  » "Le climat est notre combat commun, et il exige de chaque
     nation un engagement immédiat et concret."
```

> [!TIP]
> Drop a screen recording at `assets/demo.gif` — a 6-second loop showing a question and its answer is the single highest-impact addition you can make to this page.

<div align="right"><a href="#-table-of-contents"><sub>▲ back to top</sub></a></div>

---

## 🏗 01 · Architecture

```mermaid
flowchart TD
    A["📁 Document Corpus<br/><i>raw .txt speeches</i>"] --> B

    subgraph PREP["① INGEST & NORMALIZE"]
        B["Lowercasing"] --> C["Punctuation removal"]
        C --> D["Tokenization"]
        D --> E["Structured vocabulary"]
    end

    E --> F

    subgraph VEC["② REPRESENT"]
        F["Term Frequency<br/>TF"] --> H["TF-IDF Matrix<br/><i>terms × documents</i>"]
        G["Inverse Doc. Frequency<br/>IDF"] --> H
    end

    Q["💬 User Question"] --> QP["Same preprocessing"]
    QP --> QV["Query Vector"]

    H --> SIM
    QV --> SIM

    subgraph CMP["③ COMPARE"]
        SIM["Cosine Similarity<br/>q · d / ‖q‖‖d‖"] --> RANK["Document Ranking"]
    end

    RANK --> RET

    subgraph RES["④ RETRIEVE"]
        RET["Select pivot term<br/><i>highest TF-IDF in query</i>"] --> LOC["Locate in source document"]
        LOC --> SENT["Extract containing sentence"]
    end

    SENT --> OUT["✅ Grounded Answer<br/><i>+ source attribution</i>"]

    classDef corpus fill:#1E1B4B,stroke:#695CFE,stroke-width:2px,color:#fff
    classDef stage  fill:#0D1117,stroke:#30363D,stroke-width:1px,color:#C9D1D9
    classDef query  fill:#164E3F,stroke:#42B3A5,stroke-width:2px,color:#fff
    classDef output fill:#3B2E0A,stroke:#E5C348,stroke-width:2px,color:#fff

    class A corpus
    class B,C,D,E,F,G,H,SIM,RANK,RET,LOC,SENT stage
    class Q,QP,QV query
    class OUT output
```

### Query lifecycle

```mermaid
sequenceDiagram
    autonumber
    participant U as 👤 User
    participant UI as 🖥 Tkinter UI
    participant P as 🧹 Preprocessor
    participant V as 🧮 TF-IDF Engine
    participant R as 🎯 Retriever
    participant C as 📚 Corpus

    U->>UI: types a question
    UI->>P: raw string
    P->>P: lowercase · strip punctuation · tokenize
    P-->>V: token list

    Note over V: query is projected into the<br/>same vector space as documents

    V->>C: fetch document vectors
    C-->>V: TF-IDF matrix
    V->>V: cosine(q, dᵢ) ∀ i
    V-->>R: ranked scores

    R->>R: select highest-IDF query term (pivot)
    R->>C: locate pivot in top document
    C-->>R: containing sentence
    R-->>UI: answer + source + score
    UI-->>U: 💬 grounded response
```

<div align="right"><a href="#-table-of-contents"><sub>▲ back to top</sub></a></div>

---

## 🌀 02 · Pipeline

### ① A question enters as language

```text
"Comment une nation peut-elle agir pour le climat ?"
```

### ② It is stripped to its lexical skeleton

```diff
- Comment une nation peut-elle agir pour le climat ?
+ ["comment", "une", "nation", "peut", "elle", "agir", "pour", "le", "climat"]
```

### ③ And re-emerges as a point in ℝⁿ

```text
QUERY VECTOR  ·  dim = |V|

 climat   nation   agir    école    europe   guerre   ...
┌──────┬────────┬────────┬───────┬────────┬────────┬─────┐
│ 0.81 │  0.47  │  0.18  │ 0.00  │  0.00  │  0.00  │ ... │
└──────┴────────┴────────┴───────┴────────┴────────┴─────┘
   ▲        ▲        ▲
   │        │        └─ common verb, low IDF → low weight
   │        └────────── moderately distinctive
   └─────────────────── rare & topical → dominates the direction
```

### ④ Every document is scored against it

```text
                          COSINE SIMILARITY

 Macron       ████████████████████████████████████░░░░░░░░   0.82  ◄ best
 Chirac       ████████████████████░░░░░░░░░░░░░░░░░░░░░░░░   0.46
 Mitterrand   ███████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0.34
 Sarkozy      ███████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0.17
 Hollande     █████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0.11
 Giscard      ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0.04

                    0.0                                  1.0
```

### ⑤ And the answer is *extracted*, never invented

```mermaid
flowchart LR
    A["Top document<br/>Macron · 0.82"] --> B["Pivot term<br/><b>climat</b>"]
    B --> C["Sentence lookup<br/>in source file"]
    C --> D["📜 Verbatim sentence<br/>+ attribution"]

    classDef s fill:#0D1117,stroke:#695CFE,stroke-width:2px,color:#C9D1D9
    classDef o fill:#1E1B4B,stroke:#E5C348,stroke-width:2px,color:#fff
    class A,B,C s
    class D o
```

> [!IMPORTANT]
> The final answer stays **anchored to the original corpus**. NOVA cannot hallucinate — the worst it can do is retrieve a *poorly matched* sentence, which the similarity score immediately exposes.

<div align="right"><a href="#-table-of-contents"><sub>▲ back to top</sub></a></div>

---

## 🧮 03 · The Mathematics

Everything NOVA does reduces to four equations. All of them are implemented by hand.

<br>

### ① Term Frequency

*How often does a term appear **within** a document, normalised by that document's length?*

$$
\mathrm{tf}(t, d) = \frac{f_{t,d}}{\sum_{t' \in d} f_{t',d}}
$$

Raw counts would let long speeches dominate every query. Dividing by document length turns a count into a **rate**.

<br>

### ② Inverse Document Frequency

*How **rare** — and therefore how informative — is a term across the whole corpus?*

$$
\mathrm{idf}(t, D) = \log_{10} \frac{N}{\mathrm{df}(t)}
$$

where $N$ is the number of documents in the corpus and $\mathrm{df}(t)$ the number of documents containing $t$.

<br>

### ③ TF-IDF Weight

*The product: frequent **here**, rare **elsewhere** → high signal.*

$$
w_{t,d} = \mathrm{tf}(t, d) \times \mathrm{idf}(t, D)
$$

<br>

### ④ Cosine Similarity

*The angle between question and document — insensitive to length.*

$$
\cos(\theta) = \frac{\vec{q} \cdot \vec{d}}{\|\vec{q}\| \, \|\vec{d}\|} = \frac{\sum_i q_i d_i}{\sqrt{\sum_i q_i^2} \, \sqrt{\sum_i d_i^2}}
$$

<br>

<details>
<summary><b>🔍 Why cosine and not Euclidean distance?</b></summary>

<br>

Because **document length would dominate the metric**.

A 40-page speech and a 2-page speech on the same topic sit far apart in Euclidean terms — their vectors have very different magnitudes — yet they point in nearly the same *direction*.

```text
  d_euclid(q, d) = √( Σᵢ (qᵢ − dᵢ)² )        ← length-sensitive

  cos(θ)         = (q · d) / (‖q‖ ‖d‖)       ← direction only
                 ∈ [0, 1]                     ← length-invariant
```

Cosine similarity asks *"is this about the same thing?"* rather than *"is this the same size?"* — which is exactly the question a retrieval engine needs to answer.

</details>

<details>
<summary><b>🔍 Why <code>log</code> in the IDF term?</b></summary>

<br>

Without the logarithm, a term appearing in 1 document out of 100 would be weighted **100×** more than a term appearing in every document — an absurdly steep penalty that lets a single rare typo hijack an entire query.

The log **compresses the dynamic range**, so rarity is rewarded *smoothly*:

| Documents containing *t* | Raw ratio `N / df(t)` | `log₁₀` |
|:---|---:|---:|
| 1 / 100 | 100 | 2.00 |
| 10 / 100 | 10 | 1.00 |
| 50 / 100 | 2 | 0.30 |
| 100 / 100 | 1 | **0.00** |

Note the last row: a term present in *every* document carries **zero** discriminative information — the formula eliminates stop-words automatically, without ever needing a stop-word list.

</details>

<div align="right"><a href="#-table-of-contents"><sub>▲ back to top</sub></a></div>

---

## 🔬 04 · Under the Hood

### Four core operations

<div align="center">

| `01` | `02` | `03` | `04` |
|:---:|:---:|:---:|:---:|
| 🧹 **PREPROCESS** | 🧮 **VECTORIZE** | 📐 **COMPARE** | 🎯 **RETRIEVE** |
| normalize text | build TF-IDF | cosine similarity | extract source |
| ↓ | ↓ | ↓ | ↓ |
| `clean corpus` | `sparse vectors` | `ranked scores` | `grounded answer` |

</div>

<br>

### Reference implementation

The whole engine, conceptually, in a handful of functions — no external library involved.

```python
from math import log10, sqrt
from collections import Counter


def tokenize(text: str) -> list[str]:
    """Language → normalized token stream."""
    text = text.lower()
    text = "".join(c if c.isalpha() or c.isspace() else " " for c in text)
    return text.split()


def term_frequency(tokens: list[str]) -> dict[str, float]:
    """Raw counts, normalized by document length."""
    counts, n = Counter(tokens), len(tokens)
    return {t: c / n for t, c in counts.items()}


def inverse_document_frequency(corpus: list[list[str]]) -> dict[str, float]:
    """Rarity across the corpus. Terms present in every document → weight 0."""
    N = len(corpus)
    vocabulary = {t for doc in corpus for t in doc}
    return {
        t: log10(N / sum(t in doc for doc in corpus))
        for t in vocabulary
    }


def tf_idf(corpus: list[list[str]]) -> list[dict[str, float]]:
    """The matrix: one sparse weight vector per document."""
    idf = inverse_document_frequency(corpus)
    return [
        {t: tf * idf[t] for t, tf in term_frequency(doc).items()}
        for doc in corpus
    ]


def cosine_similarity(a: dict[str, float], b: dict[str, float]) -> float:
    """Angle between two sparse vectors. 0 = orthogonal, 1 = identical."""
    shared = a.keys() & b.keys()
    dot = sum(a[t] * b[t] for t in shared)
    norm = sqrt(sum(v * v for v in a.values())) * sqrt(sum(v * v for v in b.values()))
    return dot / norm if norm else 0.0
```

> [!NOTE]
> The sparse `dict` representation is a deliberate choice: with a 12 000-term vocabulary and 8 documents, a dense matrix would be **99 % zeros**. Intersecting keys makes similarity computation proportional to the *query* length, not to the vocabulary size.

<br>

### Complexity

| Operation | Time | Space | Notes |
|:---|:---:|:---:|:---|
| Preprocessing | `O(N · L)` | `O(N · L)` | `N` documents, `L` average length |
| IDF construction | `O(N · V)` | `O(V)` | `V` = vocabulary size |
| TF-IDF matrix | `O(N · L)` | `O(N · v̄)` | `v̄` = avg. unique terms per doc |
| Query scoring | `O(N · q)` | `O(q)` | `q` = query length, sparse intersection |
| Sentence retrieval | `O(L)` | `O(1)` | single linear scan |

<br>

### Module map

| File | Responsibility |
|:---|:---|
| `main.py` | Application entry point · Tkinter UI · event loop |
| `functions.py` | Preprocessing · TF-IDF · similarity · retrieval logic |
| `speeches/` | Raw corpus — untouched source of truth |
| `cleaned/` | Normalized corpus — reproducible intermediate artifact |

<br>

### Why interpretable?

Modern language systems hide their decision process behind billions of learned parameters. NOVA goes the other way — **every question has an answer**:

```mermaid
flowchart TD
    Q["💬 QUESTION"] --> A1["Which tokens survived preprocessing?"]
    Q --> A2["What TF-IDF weight did each term receive?"]
    Q --> A3["How similar was each document?"]
    Q --> A4["Which source ranked first, and by how much?"]
    Q --> A5["Which pivot term triggered the extraction?"]
    Q --> A6["Which exact sentence was returned?"]

    A1 --> R["🔎 Every step is<br/>printable & auditable"]
    A2 --> R
    A3 --> R
    A4 --> R
    A5 --> R
    A6 --> R

    classDef q fill:#1E1B4B,stroke:#695CFE,stroke-width:2px,color:#fff
    classDef a fill:#0D1117,stroke:#30363D,color:#C9D1D9
    classDef r fill:#164E3F,stroke:#42B3A5,stroke-width:2px,color:#fff
    class Q q
    class A1,A2,A3,A4,A5,A6 a
    class R r
```

That makes NOVA useful not only as a chatbot prototype, but as a small **laboratory for understanding classical NLP and information retrieval**.

<br>

### NOVA ≠ Generative AI

<table>
<tr>
<th align="left" width="50%">🔷 NOVA · Retrieval</th>
<th align="left" width="50%">🔶 Generative language model</th>
</tr>
<tr><td>Retrieves existing information</td><td>Generates new token sequences</td></tr>
<tr><td>Explicit, human-readable TF-IDF weights</td><td>Learned dense embeddings</td></tr>
<tr><td>Transparent, closed-form similarity metric</td><td>High-dimensional learned inference</td></tr>
<tr><td>Answer provably tied to the corpus</td><td>Answer can extend beyond source text</td></tr>
<tr><td><b>0 parameters</b> · deterministic</td><td>10⁹–10¹² parameters · stochastic</td></tr>
<tr><td>Runs on a laptop, instantly</td><td>Requires accelerated hardware</td></tr>
<tr><td>Fails <i>visibly</i> (low score)</td><td>Fails <i>fluently</i> (hallucination)</td></tr>
</table>

<div align="right"><a href="#-table-of-contents"><sub>▲ back to top</sub></a></div>

---

## 🚀 05 · Quickstart

> [!NOTE]
> **Zero dependencies.** NOVA runs on a clean Python 3 install — the standard library is all it needs.

### Requirements

<img src="https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=white">
<img src="https://img.shields.io/badge/Tkinter-bundled_with_Python-E5C348?style=flat-square">
<img src="https://img.shields.io/badge/OS-Windows_|_macOS_|_Linux-42B3A5?style=flat-square">

### Installation

```bash
# 1 · Clone
git clone https://github.com/eden2807/projetchatbotpythonL1.git

# 2 · Enter
cd projetchatbotpythonL1

# 3 · Launch
python main.py
```

<details>
<summary><b>🐧 Linux: <code>ModuleNotFoundError: No module named 'tkinter'</code></b></summary>

<br>

Tkinter ships with Python on Windows and macOS, but is packaged separately on most Linux distributions:

```bash
# Debian / Ubuntu
sudo apt install python3-tk

# Fedora
sudo dnf install python3-tkinter

# Arch
sudo pacman -S tk
```

</details>

### Usage

1. Launch the application — the corpus is indexed at startup.
2. Type a question in natural language (French).
3. NOVA returns the best-matching sentence, its source document, and the similarity score.

<br>

### Repository map

```text
NOVA
│
├── 📁 speeches/          raw document corpus  ·  untouched source of truth
│   ├── Nomination_Chirac1.txt
│   ├── Nomination_Macron.txt
│   └── ...
│
├── 📁 cleaned/           normalized corpus  ·  reproducible intermediate
│
├── 📁 assets/            header.svg · footer.svg · demo.gif
│
├── 🐍 main.py            application entry point · Tkinter interface
│
├── 🐍 functions.py       preprocessing · TF-IDF · similarity · retrieval
│
├── 📄 README.md          system documentation
│
└── 📄 LICENSE
```

<div align="right"><a href="#-table-of-contents"><sub>▲ back to top</sub></a></div>

---

## 🗺 Roadmap

The natural trajectory: from **lexical** matching, to **semantic** matching, to a **hybrid** of both.

```mermaid
flowchart LR
    subgraph V1["NOVA · CLASSICAL ✅"]
        A1["TF-IDF"] --> A2["Lexical similarity"] --> A3["Deterministic retrieval"]
    end

    subgraph V2["NOVA · SEMANTIC 🔜"]
        B1["Embeddings"] --> B2["Semantic similarity"] --> B3["Vector database"]
    end

    subgraph V3["NOVA · HYBRID 🔭"]
        C1["Lexical recall"] --> C2["Semantic precision"] --> C3["Reranking"]
    end

    V1 -.->|compare| V2
    V2 -.->|fuse| V3

    classDef done fill:#164E3F,stroke:#22C55E,stroke-width:2px,color:#fff
    classDef next fill:#1E1B4B,stroke:#695CFE,stroke-width:2px,color:#fff
    classDef future fill:#0D1117,stroke:#30363D,stroke-width:1px,color:#8B949E
    class A1,A2,A3 done
    class B1,B2,B3 next
    class C1,C2,C3 future
```

**Planned extensions**

- [x] Manual TF-IDF implementation
- [x] Cosine similarity ranking
- [x] Source-grounded sentence retrieval
- [x] Tkinter interface
- [ ] Retrieval evaluation benchmark (precision@k, MRR)
- [ ] Interactive similarity visualization
- [ ] Semantic embeddings + vector store
- [ ] Hybrid lexical/semantic search with reranking
- [ ] Larger and more diverse corpora
- [ ] Explainability dashboard (per-term contribution to score)
- [ ] Web interface
- [ ] Structured citation system

<br>

---

## ❓ FAQ

<details>
<summary><b>Why build TF-IDF by hand when scikit-learn exists?</b></summary>

<br>

Because the point was never to *use* TF-IDF — it was to *understand* it.

`TfidfVectorizer` is three lines of code and teaches nothing about smoothing, normalization choices, sparse representation, or why the logarithm is there. Implementing it manually forces every design decision into the open.

The library version is what you ship. The hand-rolled version is what makes you able to debug the library version.

</details>

<details>
<summary><b>How does NOVA handle a question with no good match?</b></summary>

<br>

It says so — via the score. A maximum cosine similarity near `0` means the query vector is nearly orthogonal to every document: the corpus contains nothing on that topic.

This is a structural advantage over generative systems, which produce equally fluent output whether or not they have relevant grounding.

</details>

<details>
<summary><b>Why French presidential speeches?</b></summary>

<br>

They form an ideal teaching corpus: thematically distinct (each president has recognizable priorities), stylistically homogeneous (same register, same genre), publicly available, and small enough that results can be verified by reading the source.

When NOVA ranks a climate question toward Macron and a decolonization question toward de Gaulle, you can confirm it by hand — which is exactly what an interpretability exercise requires.

</details>

<details>
<summary><b>What are the known limitations?</b></summary>

<br>

Honest list:

- **No semantics.** *"voiture"* and *"automobile"* are unrelated dimensions. Pure lexical overlap.
- **No morphology.** Without stemming or lemmatization, *"agir"* / *"agissons"* / *"action"* are three distinct terms.
- **No word order.** Bag-of-words discards syntax entirely — *"la France aide l'Europe"* and *"l'Europe aide la France"* are identical vectors.
- **Single-sentence answers.** Retrieval granularity is one sentence; multi-hop or multi-document questions are out of scope.

Each of these is a deliberate simplification — and each maps directly onto a roadmap item.

</details>

<details>
<summary><b>▸ Project origins</b></summary>

<br>

NOVA began as an early university Python project on text analysis and classical natural language processing.

The constraint was explicit: implement the core mechanisms manually rather than relying on NLP frameworks —

`corpus preprocessing` → `term-frequency analysis` → `inverse document frequency` → `TF-IDF matrix construction` → `vector operations` → `cosine similarity` → `document ranking` → `sentence retrieval`

The result is a first-principles exploration of the mathematical and computational foundations underlying every modern retrieval system — including the "R" in RAG.

</details>

<div align="right"><a href="#-table-of-contents"><sub>▲ back to top</sub></a></div>

---

## 🤝 Contributing

Contributions, ideas and corrections are welcome.

```bash
git checkout -b feature/your-idea
git commit -m "feat: add your idea"
git push origin feature/your-idea
```

Then open a Pull Request. For substantial changes, please open an issue first to discuss the direction.

---

## 📄 License

Released under the **MIT License** — see [`LICENSE`](LICENSE) for details.

---

<br>

<div align="center">

<a href="https://github.com/eden2807">
<img src="https://img.shields.io/badge/GitHub-eden2807-0D1117?style=for-the-badge&logo=github&logoColor=white">
</a>
<a href="https://github.com/eden2807/projetchatbotpythonL1/issues">
<img src="https://img.shields.io/badge/Report_an_issue-0D1117?style=for-the-badge&logo=gitbook&logoColor=695CFE">
</a>

<br><br>

<sub>⭐ If this helped you understand how retrieval actually works, consider starring the repo.</sub>

<br>

<img src="assets/footer.svg" width="100%" alt="NOVA — text → vector → similarity → retrieval">

</div>![Uploading header (1).svg…]()
