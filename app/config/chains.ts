import { Address } from "viem";
import { baseSepolia, Chain, optimismSepolia } from "viem/chains";

export type ChainConfig = {
  chain: Chain;
  wormholeChainId: number;
  market: Address;
};

export type ChainConfigs = typeof chainConfigs;

export const chainConfigs = {
  optimismSepolia: {
    chain: optimismSepolia,
    wormholeChainId: 10005,
    market: "0xeCD9adC284498727f7576267C3C6DC0a14481b1e",
  } as ChainConfig,
  baseSepolia: {
    chain: baseSepolia,
    wormholeChainId: 10004,
    market: "0x0c44cFecaFE4da904Ee24984FD74c91C2bE431B7",
  } as ChainConfig,
};
