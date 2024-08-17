import { Address } from "viem";
import { Chain, optimismSepolia } from "viem/chains";

export type ChainConfig = {
  chain: Chain;
  market: Address;
};

export type ChainConfigs = typeof chainConfigs;

export const chainConfigs = {
  optimismSepolia: {
    chain: optimismSepolia,
    market: "0xeCD9adC284498727f7576267C3C6DC0a14481b1e",
  } as ChainConfig,
};
