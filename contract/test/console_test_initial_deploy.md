npx hardhat run --network shibuya scripts/deploy.js
npx hardhat console --network shibuya
> const Astarbase = await ethers.getContractFactory("AstarBase")
undefined
> const astarbase = await Astarbase.attach("0x687528e4BC4040DC9ADBA05C1f00aE3633faa731")
undefined
> const tx = await astarbase.getVersion()
> receipt = await tx.wait()
> receipt.events[0].data
> await astarbase.owner()