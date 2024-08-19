export const CONTRACTS: {
  [key: string]: {
    chainId: number;
    wormholeChainId: number;
    wormholeRelayer: `0x${string}` | undefined;
    helloWormhole: `0x${string}` | undefined;
    rwa: `0x${string}` | undefined;
    market: `0x${string}` | undefined;
  };
} = {
  optimismSepolia: {
    chainId: 11155420,
    wormholeChainId: 10005,
    wormholeRelayer: "0x93BAD53DDfB6132b0aC8E37f6029163E63372cEE",
    helloWormhole: "0xFB22c49674E4482C22D4499392a8e2f760D84f8d",
    rwa: "0xcee8564039B5620b847E91866e54d2DE3fCD10a0",
    market: "0x38DCFdF916e5C5DB97B8d9818e1Babc7C7253270",
  },
  baseSepolia: {
    chainId: 84532,
    wormholeChainId: 10004,
    wormholeRelayer: "0x93BAD53DDfB6132b0aC8E37f6029163E63372cEE",
    helloWormhole: "0x17DC361D05E1A608194F508fFC4102717666779f",
    rwa: "0x0000000000000000000000000000000000000000",
    market: "0x02e1A2a943E6Ce63a89d40EFAE63bf6AcDFEc268",
  },
  ethereumSepolia: {
    chainId: 11155111,
    wormholeChainId: 10002,
    wormholeRelayer: "0x7B1bD7a6b4E61c2a123AC6BC2cbfC614437D0470",
    helloWormhole: "0x0000000000000000000000000000000000000000",
    rwa: "0x0000000000000000000000000000000000000000",
    market: "0xFe61dc25C3B8c3F990bCea5bb901704B2a8b9Bd2",
  },
  arbitrumSepolia: {
    chainId: 421614,
    wormholeChainId: 10003,
    wormholeRelayer: "0x7B1bD7a6b4E61c2a123AC6BC2cbfC614437D0470",
    helloWormhole: "0x0000000000000000000000000000000000000000",
    rwa: "0x0000000000000000000000000000000000000000",
    market: "0x539dA825856778B593a55aC4E8A0Ec1441f18e78",
  },
};
