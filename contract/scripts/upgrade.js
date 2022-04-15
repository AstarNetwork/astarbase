async function main() {
    const newAstarBase = await ethers.getContractFactory("AstarBase_example_upgrade")
    let proxy = await upgrades.upgradeProxy("0xA046f9Dd588521601923B0e9bAbb650F8117C04C", newAstarBase)
    console.log("Your contract is upgraded! Proxy remains at:", proxy.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })