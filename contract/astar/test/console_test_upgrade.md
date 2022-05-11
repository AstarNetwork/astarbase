npx hardhat run --network astar scripts/upgrade.js
npx hardhat console --network astar
> const newAstarBase = await ethers.getContractFactory("AstarBaseV3")
undefined
> const astarbase = await newAstarBase.attach("0x8E2fa5A4D4e4f0581B69aF2f8F2Ef2CF205aE8F0")
undefined
> await astarbase.version()
> const tx = await astarbase.getVersion()
> receipt = await tx.wait()
> receipt.events[0].data
> implAddr = await upgrades.erc1967.getImplementationAddress("0x8E2fa5A4D4e4f0581B69aF2f8F2Ef2CF205aE8F0")