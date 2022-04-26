async function main() {
  const newAstarBase = await ethers.getContractFactory('AstarBaseV3');
  let proxy = await upgrades.upgradeProxy(
    '0xF183f51D3E8dfb2513c15B046F848D4a68bd3F5D',
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
