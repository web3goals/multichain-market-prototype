import hre, { ethers } from "hardhat";
import { CONTRACTS } from "./data/deployed-contracts";

async function main() {
  console.log("👟 Start script 'use-hello-wormhole'");

  const network = hre.network.name;

  // Define contracts
  const helloWormhole = await ethers.getContractAt(
    "HelloWormhole",
    CONTRACTS[network].helloWormhole as `0x${string}`
  );

  // Check greeting
  const latestGreeting = await helloWormhole.latestGreeting();
  console.log({ latestGreeting });

  //   Send greeting
  const targetChain = 10004; // Base Sepolia
  const targetAddress = "0x17DC361D05E1A608194F508fFC4102717666779f"; // Base Sepolia
  const greeting = "Hello, Wormhole!";
  const cost = await helloWormhole.quoteCrossChainGreeting(targetChain);
  console.log({ cost });
  const tx = await helloWormhole.sendCrossChainGreeting(
    targetChain,
    targetAddress,
    greeting,
    { value: cost }
  );
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
