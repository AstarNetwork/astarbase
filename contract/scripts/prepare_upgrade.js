async function main() {
    const proxyAddress = '0x250AdFd41cEb7dD99793Ef9C2CfC9bb069837073';

    const AstarBaseV2 = await ethers.getContractFactory("AstarBaseV2");
    console.log("Preparing AstarBaseV2 upgrade...");
    const astarBaseV2address = await upgrades.prepareUpgrade(proxyAddress, AstarBaseV2);
    console.log("proxyAddress at:", proxyAddress);
    console.log("AstarBaseV2 at:", astarBaseV2address);
  }

  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
