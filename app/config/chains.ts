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
    market: "0x0000000000000000000000000000000000000000",
  } as ChainConfig,
};
