import { Chain, optimismSepolia } from "viem/chains";

export type SiteConfig = typeof siteConfig;

export type SiteConfigContracts = {
  chain: Chain;
  market: `0x${string}`;
};

export const siteConfig = {
  emoji: "🐙",
  name: "Multichain Market",
  description: "A multichain marketplace powered by Wormhole",
  links: {
    github: "https://github.com/web3goals/multichain-market-prototype",
    twitter: "https://twitter.com/kiv1n",
  },
  contracts: {
    optimismSepolia: {
      chain: optimismSepolia,
      market: "0x0000000000000000000000000000000000000000" as `0x${string}`,
    } as SiteConfigContracts,
  },
};
