npx hardhat run --network shibuya scripts/upgrade.js
npx hardhat console --network shibuya
> const AstarBaseV2 = await ethers.getContractFactory("AstarBaseV2")
undefined
> const astarBaseV2 = await AstarBaseV2.attach("0x23721848D8D6D6691B7AD2bbE34D73F81dA4270c")
undefined
> (await astarBaseV2.getVersion()).toString()
'2'
> await astarBaseV2.setVersion()
{ hash:
...
> (await astarBaseV2.getVersion()).toString()
'7'