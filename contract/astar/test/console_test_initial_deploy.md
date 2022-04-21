npx hardhat run --network astar scripts/deploy.js
npx hardhat console --network astar
> const Astarbase = await ethers.getContractFactory("AstarBase")
undefined
> const astarbase = await Astarbase.attach("0x8E2fa5A4D4e4f0581B69aF2f8F2Ef2CF205aE8F0")
undefined
> const tx = await astarbase.getVersion()
> receipt = await tx.wait()
> receipt.events[0].data
> await astarbase.owner()