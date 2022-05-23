// test/AstarBaseV2.proxy.js
// Load dependencies
const { expect, use } = require('chai');
const { solidity } = require('ethereum-waffle');

use(solidity);

let ab;

// Start test block
describe('AstarBaseV3 functions', function () {
  let owner;
  let bob;

  beforeEach(async function () {
    [owner, bob] = await ethers.getSigners();

    AstarBase = await ethers.getContractFactory('AstarBase');
    NewAstarBase = await ethers.getContractFactory('AstarBaseV3');
    DappsS = await ethers.getContractFactory('DappsStaking');
    Sr25519 = await ethers.getContractFactory('SR25519');
    Ecdsa = await ethers.getContractFactory('ECDSA');

    astarBaseProxy = await upgrades.deployProxy(AstarBase);
    ab = await upgrades.upgradeProxy(astarBaseProxy.address, NewAstarBase);

    dapps = await DappsS.deploy();
    sr25519 = await Sr25519.deploy();
    ecdsa = await Ecdsa.deploy();
    await dapps.deployed();
    await sr25519.deployed();
    await ecdsa.deployed();

    await ab.setPrecompileAddresses(dapps.address, sr25519.address, ecdsa.address);

    expect(await ab.DAPPS_STAKING()).to.be.equal(dapps.address);
    expect(await ab.SR25519Contract()).to.be.equal(sr25519.address);
    expect(await ab.ECDSAContract()).to.be.equal(ecdsa.address);
  });

  it('retrieve unregister fee', async function () {
    fee = ethers.utils.parseUnits('1', 0);
    const expectedFee = fee.mul(ethers.constants.WeiPerEther);
    expect((await ab.unregisterFee()) - expectedFee).to.equal(0);
  });

  it('register ss58 works', async function () {
    const ss58PublicKey = '0xe08631af2471a85e879e093250639f0b716cf912ec9a8aded40c8d8a824f0154';
    const signedMsg =
      '0xe622d5dc321cb568d02b388fb3a023f578f37772c0331ef3911600020dd7434edc5015210de0f15e54add7e9229ae1dcceadd4de53449e598793125baa59238a';

    expect(await ab.registeredCnt()).to.equal(0);
    let tx = await ab.connect(bob).register(ss58PublicKey, signedMsg);
    let receipt = await tx.wait();
    console.log(await ab.registeredCnt());
    expect(await ab.registeredCnt()).to.equal(1);

    expect(receipt.events[0].args[0]).to.equal(bob.address);
    expect(receipt.events[0].event).to.equal('AstarBaseRegistered');
  });
});
