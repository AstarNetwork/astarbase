async function main() {
  const newAstarBase = await ethers.getContractFactory('AstarBaseV5');
  let proxy = await upgrades.upgradeProxy(
    '0x25257be737210F72DA4F51aCB66903A7520e59d6',
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
