import { ChainConfig, chainConfigs } from "@/config/chains";
import { Chain } from "viem";

export function chainToChainConfig(
  chain: Chain | string | number | undefined
): ChainConfig {
  let contracts;
  if (typeof chain === "string") {
    contracts = Object.values(chainConfigs).find(
      (element) => String(element.chain.id) === chain
    );
  }
  if (typeof chain === "number") {
    contracts = Object.values(chainConfigs).find(
      (element) => element.chain.id === chain
    );
  }
  if (typeof chain === "object") {
    contracts = Object.values(chainConfigs).find(
      (element) => element.chain.id === chain.id
    );
  }
  if (!contracts) {
    throw new Error(
      `Failed to find a config for the chain: ${chain?.toString()}`
    );
  }
  return contracts;
}
