async function main() {
  const newAstarBase = await ethers.getContractFactory('AstarBaseV3');
  let proxy = await upgrades.upgradeProxy(
    '0x8E2fa5A4D4e4f0581B69aF2f8F2Ef2CF205aE8F0',
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
