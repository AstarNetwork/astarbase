npx hardhat run --network shibuya scripts/deploy.js
npx hardhat console --network shibuya
> const Astarbase = await ethers.getContractFactory("AstarBase")
undefined
> const astarbase = await Astarbase.attach("0x6D46BD2d301B46686717531A2F603191A536238D")
undefined
> const tx = await astarbase.getVersion()
> receipt = await tx.wait()
> receipt.events[0].data
> await astarbase.owner()