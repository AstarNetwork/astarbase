npx hardhat run --network shibuya scripts/upgrade.js
npx hardhat console --network shibuya
> const newAstarBase = await ethers.getContractFactory("AstarBaseV2")
undefined
> const astarbase = await newAstarBase.attach("0x25257be737210F72DA4F51aCB66903A7520e59d6")
undefined
> const tx = await astarbase.getVersion()
> receipt = await tx.wait()
> receipt.events[0].data