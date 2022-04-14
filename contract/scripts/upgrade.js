async function main() {
    const AstarBaseV2 = await ethers.getContractFactory("AstarBaseV2")
    let proxy = await upgrades.upgradeProxy("0x23721848D8D6D6691B7AD2bbE34D73F81dA4270c", AstarBaseV2)
    console.log("Your upgraded proxy is done!", proxy.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })