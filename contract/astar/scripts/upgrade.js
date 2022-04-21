async function main() {
  const newAstarBase = await ethers.getContractFactory('AstarBaseV2');
  let proxy = await upgrades.upgradeProxy(
    'add Astar address here',
    newAstarBase
  );
  console.log('Your contract is upgraded! Proxy remains at:', proxy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
