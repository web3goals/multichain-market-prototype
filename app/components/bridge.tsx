"use client";

import Script from "next/script";

export function Bridge() {
  return (
    <>
      <div id="wormhole-connect" data-config='{"env":"testnet"}'></div>
      <Script
        src="https://www.unpkg.com/@wormhole-foundation/wormhole-connect@0.3.0/dist/main.js"
        type="module"
        strategy="afterInteractive"
      />
      <link rel="https://www.unpkg.com/@wormhole-foundation/wormhole-connect@0.3.0/dist/main.css" />
    </>
  );
}
