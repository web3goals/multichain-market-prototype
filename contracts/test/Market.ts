import { ethers } from "hardhat";
import { Market__factory, RealWorldAsset__factory } from "../typechain-types";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";

describe("Market", function () {
  async function initFixture() {
    // Get signers
    const [deployer, userOne, userTwo] = await ethers.getSigners();
    // Deploy contracts
    const rwaContract = await new RealWorldAsset__factory(deployer).deploy();
    const marketContract = await new Market__factory(deployer).deploy(
      ethers.ZeroAddress
    );
    return {
      userOne,
      userTwo,
      rwaContract,
      marketContract,
    };
  }

  it("Should list and buy NFT", async function () {
    const { userOne, userTwo, rwaContract, marketContract } = await loadFixture(
      initFixture
    );
    // Mint NFT
    await rwaContract.connect(userOne).mint("");
    expect(await rwaContract.balanceOf(userOne)).to.equal(1);
    expect(await rwaContract.ownerOf(0)).to.equal(userOne);
    // List NFT
    await rwaContract
      .connect(userOne)
      .approve(await marketContract.getAddress(), 0);
    await marketContract
      .connect(userOne)
      .listItem(await rwaContract.getAddress(), 0, ethers.parseEther("0.05"));
    // Check history
    let histories = await marketContract.getHistories();
    expect(histories[0].tokenId).to.equal(0);
    expect(histories[0].buyer).to.equal(ethers.ZeroAddress);
    // Buy NFT
    await expect(
      marketContract
        .connect(userTwo)
        ["buyItem(address,uint256)"](await rwaContract.getAddress(), 0, {
          value: ethers.parseEther("0.05"),
        })
    ).changeEtherBalances(
      [await marketContract.getAddress(), userTwo],
      [ethers.parseEther("0.05"), ethers.parseEther("-0.05")]
    );
    expect(await rwaContract.balanceOf(userOne)).to.equal(0);
    expect(await rwaContract.balanceOf(userTwo)).to.equal(1);
    expect(await rwaContract.ownerOf(0)).to.equal(userTwo);
    expect(await marketContract.getBalance(userOne)).to.equal(
      ethers.parseEther("0.05")
    );
    // Check history
    histories = await marketContract.getHistories();
    expect(histories[0].tokenId).to.equal(0);
    expect(histories[0].buyer).to.equal(userTwo);
    // Withdraw balance
    await expect(
      marketContract.connect(userOne).withdrawBalance()
    ).to.changeEtherBalances(
      [await marketContract.getAddress(), userOne],
      [ethers.parseEther("-0.05"), ethers.parseEther("0.05")]
    );
  });
});
