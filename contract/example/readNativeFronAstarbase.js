const ethers = require('ethers');
const { exit } = require('process');
const providerRPC = {
  astarPass: {
    name: 'astar',
    rpc: 'https://astar.api.onfinality.io/public',
    chainId: 592,
    tokenName: 'ASTR',
    contract: '0x8E2fa5A4D4e4f0581B69aF2f8F2Ef2CF205aE8F0'
  }
};
const provider = new ethers.providers.StaticJsonRpcProvider(providerRPC.astarPass.rpc, {
  chainId: providerRPC.astarPass.chainId,
  name: providerRPC.astarPass.name,
});

const abi = [
  "function addressMap(address evmAddress) public view returns (bytes native)"
];

const myArgs = process.argv.slice(1);
console.log(myArgs[1]);
if (typeof myArgs[1] === 'undefined'){
  console.log("missing input evm address");
  exit();
}
const evmAddress = myArgs[1];

const readNative = async () => {
  console.log(`reading native address on ${providerRPC.astarPass.name} for ${evmAddress}` );

  const contract = new ethers.Contract(providerRPC.astarPass.contract, abi, provider);
  const native = await contract.addressMap(evmAddress);
  console.log(native);
}


readNative()
