import hre, { ethers } from "hardhat";
import { CONTRACTS } from "./data/deployed-contracts";

async function main() {
  console.log("👟 Start script 'use-real-world-asset'");

  const network = hre.network.name;

  // Define contracts
  const rwa = await ethers.getContractAt(
    "RealWorldAsset",
    CONTRACTS[network].rwa as `0x${string}`
  );

  // Mint NFT
  await rwa.mint("ipfs://QmU3eL5MbJKsXPtdMck9xgsSiiGSy3hXJVrnDoNz7Jf7Jq");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
