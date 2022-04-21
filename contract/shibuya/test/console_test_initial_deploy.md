npx hardhat run --network astar scripts/deploy.js
npx hardhat console --network astar
> const Astarbase = await ethers.getContractFactory("AstarBase")
undefined
> const astarbase = await Astarbase.attach("0x25257be737210F72DA4F51aCB66903A7520e59d6")
undefined
> const tx = await astarbase.getVersion()
> receipt = await tx.wait()
> receipt.events[0].data
> await astarbase.owner()