const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const AstarBase = await hre.ethers.getContractFactory("AstarBase");
  const astarbase = await AstarBase.deploy();

  await astarbase.deployed();

  console.log("AstarBase deployed to:", astarbase.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
