npx hardhat run --network shibuya scripts/upgrade.js
npx hardhat console --network shibuya
> const newAstarBase = await ethers.getContractFactory("AstarBase_example_upgrade")
undefined
> const astarbase = await Astarbase.attach("0xA046f9Dd588521601923B0e9bAbb650F8117C04C")
undefined
> const tx = await astarbase.getVersion()
> receipt = await tx.wait()
> receipt.events[0].data