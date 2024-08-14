export const CONTRACTS: {
  [key: string]: {
    chainId: number;
    wormholeChainId: number;
    wormholeRelayer: `0x${string}` | undefined;
    helloWormhole: `0x${string}` | undefined;
  };
} = {
  optimismSepolia: {
    chainId: 11155420,
    wormholeChainId: 10005,
    wormholeRelayer: "0x93BAD53DDfB6132b0aC8E37f6029163E63372cEE",
    helloWormhole: "0xFB22c49674E4482C22D4499392a8e2f760D84f8d",
  },
  baseSepolia: {
    chainId: 84532,
    wormholeChainId: 10004,
    wormholeRelayer: "0x93BAD53DDfB6132b0aC8E37f6029163E63372cEE",
    helloWormhole: "0x17DC361D05E1A608194F508fFC4102717666779f",
  },
};
