npx hardhat run --network shiden scripts/upgrade.js
npx hardhat console --network shiden
> const newAstarBase = await ethers.getContractFactory("AstarBaseV5")
undefined
> const astarbase = await newAstarBase.attach("0x25257be737210F72DA4F51aCB66903A7520e59d6")
undefined
> const tx = await astarbase.getVersion()
> receipt = await tx.wait()
> receipt.events[0].data
> await astarbase.version()
> implAddr = await upgrades.erc1967.getImplementationAddress("0x25257be737210F72DA4F51aCB66903A7520e59d6")
'0xE1a1203c12C64daB255519a9fF635E08645e8739'