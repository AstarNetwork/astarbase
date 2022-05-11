npx hardhat run --network shiden scripts/deploy.js
npx hardhat console --network shiden
> const Astarbase = await ethers.getContractFactory("AstarBaseV3")
undefined
> const astarbase = await Astarbase.attach("0x25257be737210F72DA4F51aCB66903A7520e59d6")
undefined
> const tx = await astarbase.getVersion()
> receipt = await tx.wait()
> receipt.events[0].data
> await astarbase.owner()