async function main() {
    const AstarBaseV2 = await ethers.getContractFactory("AstarBaseV2")
    let proxy = await upgrades.upgradeProxy("0x6D46BD2d301B46686717531A2F603191A536238D", AstarBaseV2)
    console.log("Your upgraded proxy is done!", proxy.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })