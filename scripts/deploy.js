// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const hoboTokenAddress = "0x25100c0083e8e53b1cb264e978522bd477011a0d";
  const price = hre.ethers.utils.parseEther("0.01");
  // deploying contract for buying hobo toking
  const BuyHobo = await hre.ethers.getContractFactory("BuyHobo");
  const buyHobo = await BuyHobo.deploy(hoboTokenAddress, price);

  await buyHobo.deployed();

  console.log("BuyHobo deployed to:", buyHobo.address);

  // deploying contract for staking hobo rewards token
  const StakeHoboRewardToken = await hre.ethers.getContractFactory(
    "StakeHoboToken"
  );
  const stakeHoboRewardToken = await StakeHoboRewardToken.deploy();

  await stakeHoboRewardToken.deployed();

  console.log("StakeHoboToken deployed to:", stakeHoboRewardToken.address);

  // deploying contract for staking hobo contract
  const StakeHobo = await hre.ethers.getContractFactory("StakeHobo");
  const stakeHobo = await StakeHobo.deploy(
    hoboTokenAddress,
    stakeHoboRewardToken.address
  );

  await stakeHobo.deployed();

  console.log("StakeHobo deployed to:", stakeHobo.address);

  // deploying contract for swapping hobo contract

  const SwapHobo = await hre.ethers.getContractFactory("SwapHobo");
  const swapHobo = await SwapHobo.deploy(hoboTokenAddress);

  await swapHobo.deployed();

  console.log("SwapHobo deployed to:", swapHobo.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
