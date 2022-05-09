npx hardhat run --network shibuya scripts/upgrade.js
npx hardhat console --network shibuya
> const newAstarBase = await ethers.getContractFactory("AstarBaseV3")
undefined
> const astarbase = await newAstarBase.attach("0xF183f51D3E8dfb2513c15B046F848D4a68bd3F5D")
undefined
> const tx = await astarbase.getVersion()
> receipt = await tx.wait()
> receipt.events[0].data
> await astarbase.owner()
> await astarbase.version()
> await upgrades.erc1967.getImplementationAddress("0xF183f51D3E8dfb2513c15B046F848D4a68bd3F5D")


# Shibuya, AstarBaseV3, '0xf2d7939251735587b5802B1516405D2B633885C2'
npx hardhat verify --network shibuya 0xf2d7939251735587b5802B1516405D2B633885C2

# Shibuya TransparentUpgradableProxy verification. Compiler 0.8.0, source from same proxy on Astar, Optimization 200, Fetch auto arguments

# Shibuya verification. Compiler 0.8.7, flattened code pragma 0.8.7, Optimization 0


# To use Remix, At Address is the address of the proxy!