import hre, { ethers } from "hardhat";
import { CONTRACTS } from "./data/deployed-contracts";

async function main() {
  console.log("👟 Start script 'use-market'");

  const network = hre.network.name;

  // Define contracts
  const rwa = await ethers.getContractAt(
    "RealWorldAsset",
    CONTRACTS[network].rwa as `0x${string}`
  );
  const market = await ethers.getContractAt(
    "Market",
    CONTRACTS[network].market as `0x${string}`
  );

  // Mint NFT
  //   await rwa.mint("");

  // List items
  //   await rwa.approve(await market.getAddress(), 0);
  //   await market.listItem(await rwa.getAddress(), 0, ethers.parseEther("0.0012"));

  // Print listing
  //   const listing = await market.getListing(await rwa.getAddress(), 0);
  //   console.log({ listing });

  // Buy item
  //   const targetChain = 10005; // Optimism Sepolia
  //   const targetAddress = "0x1F2c31D5034F27A4352Bc6ca0fc72cdC32809808"; // Optimism Sepolia
  //   const nftAddress = "0xcee8564039B5620b847E91866e54d2DE3fCD10a0"; // Optimism Sepolia
  //   const tokenId = 0; // Optimism Sepolia
  //   const itemPrice = ethers.parseEther("0.0012");
  //   const itemSeller = "0x4306D7a79265D2cb85Db0c5a55ea5F4f6F73C4B1";
  //   const cost = await market.getWormholeCost(targetChain);
  //   await market["buyItem(uint16,address,address,uint256,uint256,address)"](
  //     targetChain,
  //     targetAddress,
  //     nftAddress,
  //     tokenId,
  //     itemPrice,
  //     itemSeller,
  //     { value: cost + itemPrice }
  //   );

  // Print balance
  //   const balance = await market.getBalance(
  //     "0x4306D7a79265D2cb85Db0c5a55ea5F4f6F73C4B1"
  //   );
  //   console.log({ balance });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
