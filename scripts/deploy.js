const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, World!");

  const Token = await hre.ethers.getContractFactory("ERC20Token");
  const token = await Token.deploy("Test Token", "TT", 0, 1000000, deployer.address);

  const TokenFactory = await hre.ethers.getContractFactory("ERC20TokenFactory");
  const tokenFactory = await TokenFactory.deploy();

  await greeter.deployed();
  await token.deployed();
  await tokenFactory.deployed();

  console.log("Greeter deployed to:", greeter.address);
  console.log("Token deployed to:", token.address);
  console.log("Token Factory deployed to:", tokenFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });