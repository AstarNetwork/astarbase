npx hardhat run --network shibuya scripts/deploy.js
npx hardhat console --network shibuya
> const Astarbase = await ethers.getContractFactory("AstarBase")
undefined
> const astarbase = await Astarbase.attach("0x23721848D8D6D6691B7AD2bbE34D73F81dA4270c")
undefined
> (await astarbase.getVersion()).toString()
> await astarbase.setVersion()
> (await astarbase.getVersion()).toString()
