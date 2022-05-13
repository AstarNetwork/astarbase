npx hardhat run --network astar scripts/deploy.js
npx hardhat console --network astar
> const Astarbase = await ethers.getContractFactory("AstarBase")
undefined
> const astarbase = await Astarbase.attach("0xF183f51D3E8dfb2513c15B046F848D4a68bd3F5D")
undefined
> const tx = await astarbase.getVersion()
> receipt = await tx.wait()
> receipt.events[0].data
> await astarbase.owner()