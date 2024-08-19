"use client";

import WormholeConnect from "@wormhole-foundation/wormhole-connect";

export function Bridge() {
  return <WormholeConnect config={{ env: "testnet" }} />;
}
