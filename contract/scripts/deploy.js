async function main() {
    const AstarBase = await ethers.getContractFactory("AstarBase");
    console.log(AstarBase.functions)
    console.log("Deploying AstarBase...");
    const proxy = await upgrades.deployProxy(AstarBase);
    console.log("AstarBase proxy deployed to:", proxy.address);
  }

  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });