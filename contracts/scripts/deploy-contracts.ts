import hre, { ethers } from "hardhat";
import { CONTRACTS } from "./data/deployed-contracts";

async function main() {
  console.log("👟 Start script 'deploy-contracts'");

  const network = hre.network.name;

  if (!CONTRACTS[network].helloWormhole && CONTRACTS[network].wormholeRelayer) {
    const contractFactory = await ethers.getContractFactory("HelloWormhole");
    const contract = await contractFactory.deploy(
      CONTRACTS[network].wormholeRelayer
    );
    await contract.waitForDeployment();
    console.log(
      `Contract 'HelloWormhole' deployed to: ${await contract.getAddress()}`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
