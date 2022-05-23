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
    Sr25519 = await ethers.getContractFactory('SR25519Mock');
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
    // Mock contract checks only last byte
    // for public key 1 is valid value
    // for message 9 is valid value
    const ss58PublicKey = '0x1111111111111111111111111111111111111111111111111111111111111111';
    const signedMsg =
      '0x99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999';

    expect(await ab.registeredCnt()).to.equal(0);
    let tx = await ab.connect(bob).register(ss58PublicKey, signedMsg);
    let receipt = await tx.wait();
    expect(await ab.registeredCnt()).to.equal(1);

    expect(receipt.events[0].args[0]).to.equal(bob.address);
    expect(receipt.events[0].event).to.equal('AstarBaseRegistered');
  });

  it('register fails, rejected by Sr25519.verify()', async function () {
    // Mock contract checks only last byte
    // for public key 1 is valid value
    // for message 9 is valid value
    const ss58PublicKey = '0x1111111111111111111111111111111111111111111111111111111111111110';
    const signedMsg =
      '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';

    expect(await ab.registeredCnt()).to.equal(0);
    await expect(ab.connect(bob).register(ss58PublicKey, signedMsg)).to.revertedWith(
      'Signed message not confirmed'
    );
    expect(await ab.registeredCnt()).to.equal(0);
  });
});
