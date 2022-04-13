$ npx hardhat console --network shibuya
> const Astarbase = await ethers.getContractFactory("AstarBase")
undefined
> const astarbase = await Astarbase.attach("0x06a52e12e12C5dc40ff63618FAfb4fD98694E421")
undefined
> (await astarbase.getVersion()).toString()
> await astarbase.setVersion()
> (await astarbase.getVersion()).toString()
