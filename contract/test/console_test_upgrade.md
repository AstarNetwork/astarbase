npx hardhat run --network shibuya scripts/upgrade.js
npx hardhat console --network shibuya
> const AstarBaseV2 = await ethers.getContractFactory("AstarBaseV2")
undefined
> const astarBaseV2 = await AstarBaseV2.attach("0x64741276eDDF1fb1aD1fbd1ABD7ef5E8d1890E9b")
undefined
> (await astarBaseV2.getVersion()).toString()
'2'
> await astarBaseV2.setVersion()
{ hash:
...
> (await astarBaseV2.getVersion()).toString()
'7'