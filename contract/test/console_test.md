npx hardhat console --network shibuya
> const AstarBaseV2 = await ethers.getContractFactory("AstarBaseV2")
undefined
> const astarBaseV2 = await AstarBaseV2.attach("0x250AdFd41cEb7dD99793Ef9C2CfC9bb069837073")
undefined
> (await astarBaseV2.getVersion()).toString()
'1'
> await astarBaseV2.setVersion()
{ hash:
...
> (await astarBaseV2.getVersion()).toString()
'2'