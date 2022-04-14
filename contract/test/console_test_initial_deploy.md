npx hardhat run --network shibuya scripts/deploy.js
npx hardhat console --network shibuya
> const Astarbase = await ethers.getContractFactory("AstarBase")
undefined
> const astarbase = await Astarbase.attach("0x64741276eDDF1fb1aD1fbd1ABD7ef5E8d1890E9b")
undefined
> (await astarbase.getVersion()).toString()
> await astarbase.setVersion()
> (await astarbase.getVersion()).toString()
