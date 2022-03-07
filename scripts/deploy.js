const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const Token = await hre.ethers.getContractFactory("ERC20Token");
  const token = await Token.deploy("Test Token", "TT", 0, 1000000, deployer.address);

  const TokenRegister = await hre.ethers.getContractFactory("ERC20TokenRegister");
  const tokenRegister = await TokenRegister.deploy();

  await token.deployed();
  await tokenRegister.deployed();

  console.log("Token deployed to:", token.address);
  console.log("Token List deployed to:", tokenRegister.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });