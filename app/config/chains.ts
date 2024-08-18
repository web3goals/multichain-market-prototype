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
    market: "0x38DCFdF916e5C5DB97B8d9818e1Babc7C7253270",
  } as ChainConfig,
  baseSepolia: {
    chain: baseSepolia,
    wormholeChainId: 10004,
    market: "0x02e1A2a943E6Ce63a89d40EFAE63bf6AcDFEc268",
  } as ChainConfig,
};
