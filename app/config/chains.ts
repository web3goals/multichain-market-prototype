import { Address } from "viem";
import {
  arbitrumSepolia,
  baseSepolia,
  Chain,
  optimismSepolia,
  sepolia,
} from "viem/chains";

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
  ethereumSepolia: {
    chain: sepolia,
    wormholeChainId: 10002,
    market: "0xFe61dc25C3B8c3F990bCea5bb901704B2a8b9Bd2",
  } as ChainConfig,
  arbitrumSepolia: {
    chain: arbitrumSepolia,
    wormholeChainId: 10003,
    market: "0x539dA825856778B593a55aC4E8A0Ec1441f18e78",
  } as ChainConfig,
};
