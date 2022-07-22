// test/astarBase-test.js

// Load dependencies
const { expect, use } = require('chai');
const { solidity } = require('ethereum-waffle');

use(solidity);

let ab;

// Start test block
describe('AstarBaseV4 functions', function () {
  let owner;
  let bob;

  // These constants are used in Mock contracts
  const validSs58PublicKey = '0x1111111111111111111111111111111111111111111111111111111111111111';
  const invalidPublicKey = '0x0111111111111111111111111111111111111111111111111111111111111110';
  const zeroPublicKey =    '0x0000000000000000000000000000000000000000000000000000000000000000';
  const validECDSAPublicKey = '0x2222222222222222222222222222222222222222222222222222222222222222';
  const stakedOnContract = '0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa';
  const notStakedContract = '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB';
  const validSignedMsg =
    '0x99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999';
  const invalidSignedMsg =
    '0x88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888';

  const staked_amount = 50; // check dapps staking mock for used value

  beforeEach(async function () {
    [owner, bob] = await ethers.getSigners();

    AstarBase = await ethers.getContractFactory('AstarBase');
    AstarBaseExternal = await ethers.getContractFactory('AstarBaseExt');
    NewAstarBase = await ethers.getContractFactory('AstarBaseV5');
    DappsS = await ethers.getContractFactory('DappsStakingMock');
    Sr25519 = await ethers.getContractFactory('SR25519Mock');
    Ecdsa = await ethers.getContractFactory('ECDSAMock');

    astarBaseProxy = await upgrades.deployProxy(AstarBase);
    ab = await upgrades.upgradeProxy(astarBaseProxy.address, NewAstarBase);

    abExternal = await AstarBaseExternal.deploy();
    dapps = await DappsS.deploy();
    sr25519 = await Sr25519.deploy();
    ecdsa = await Ecdsa.deploy();
    await dapps.deployed();
    await sr25519.deployed();
    await ecdsa.deployed();
    await abExternal.deployed();

    await ab.setPrecompileAddresses(dapps.address, sr25519.address, ecdsa.address);
    await abExternal.connect(owner).setPrecompileAddresses(dapps.address, sr25519.address);

    expect(await ab.DAPPS_STAKING()).to.be.equal(dapps.address);
    expect(await ab.SR25519Contract()).to.be.equal(sr25519.address);
    expect(await ab.ECDSAContract()).to.be.equal(ecdsa.address);
  });

  describe('External AstarBase checks', function () {
    it('External isRegistar works', async function () {
      // register in external astarbase and check in upgradable contract
      // this should return false since there is no externalAstarbaseAddress set
      await external_register_and_verify(validSs58PublicKey, validSignedMsg, bob);
      expect(await ab.callStatic.isRegistered(bob.address)).to.be.false;

      await ab.setExternalAstarbaseAddress(abExternal.address);
      expect(await ab.callStatic.isRegistered(bob.address)).to.be.true;
    });

    it('isRegiser, including external, returns false', async function () {
      // this should return false since there is no externalAstarbaseAddress set
      expect(await ab.callStatic.isRegistered(bob.address)).to.be.false;
      // set external database 
      await ab.setExternalAstarbaseAddress(abExternal.address);
      // user Bob is not registered neither in external nor in internal contract
      expect(await ab.callStatic.isRegistered(bob.address)).to.be.false;
    });

  });

  describe('General checks', function () {
    it('retrieve unregister fee', async function () {
      fee = ethers.utils.parseUnits('1', 0);
      const expectedFee = fee.mul(ethers.constants.WeiPerEther);
      expect((await ab.unregisterFee()) - expectedFee).to.equal(0);
    });
  });

  describe('Registration checks', function () {
    it('register ss58 OK', async function () {
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);
    });

    it('register ecdsa OK, rejected by Sr25519.verify() but Ecdsa is verified', async function () {
      await register_and_verify(validECDSAPublicKey, validSignedMsg, bob);
    });

    it('register fails, rejected by Sr25519.verify()', async function () {
      expect(await ab.registeredCnt()).to.equal(0);
      await expect(ab.connect(bob).register(invalidPublicKey, invalidSignedMsg)).to.revertedWith(
        'Signed message not confirmed'
      );
      expect(await ab.registeredCnt()).to.equal(0);
      expect(await ab.callStatic.isRegistered(bob.address)).to.be.false;
    });

    it('register fails, double use of ss5 public key', async function () {
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);

      await expect(ab.connect(bob).register(validSs58PublicKey, validSignedMsg)).to.revertedWith(
        'Already used ss58 Public Key'
      );
      expect(await ab.registeredCnt()).to.equal(1);
      expect(await ab.callStatic.isRegistered(bob.address)).to.be.true;
    });

    it('register fails, ss5 public key is 0', async function () {
      await expect(ab.connect(bob).register(zeroPublicKey, validSignedMsg)).to.revertedWith(
        "Can't register ss58PublicKey with 0"
      );
      expect(await ab.registeredCnt()).to.equal(0);
      expect(await ab.callStatic.isRegistered(bob.address)).to.be.false;
    });

    it('register fails, double use of evm address', async function () {
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);

      await expect(ab.connect(bob).register(validECDSAPublicKey, validSignedMsg)).to.revertedWith(
        'Already registered evm address'
      );
      expect(await ab.registeredCnt()).to.equal(1);
      expect(await ab.callStatic.isRegistered(bob.address)).to.be.true;
    });
  });

  describe('Un-Registration', function () {
    it('unregister OK', async function () {
      const fee = await ab.unregisterFee();
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);
      await ab.connect(bob).unRegister({ value: fee });
      expect(await ab.registeredCnt()).to.equal(0);
      expect(await ab.callStatic.isRegistered(bob.address)).to.be.false;
    });

    it('unregister fails, Not enough funds to unregister', async function () {
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);

      await expect(ab.connect(bob).unRegister()).to.revertedWith('Not enough funds to unregister');
      expect(await ab.registeredCnt()).to.equal(1);
      expect(await ab.callStatic.isRegistered(bob.address)).to.be.true;
    });

    it('unregister fails, unknown address', async function () {
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);
      const fee = await ab.unregisterFee();
      await expect(ab.connect(owner).unRegister({ value: fee })).to.revertedWith(
        'Unregistring unknown entry'
      );
      expect(await ab.registeredCnt()).to.equal(1);
      expect(await ab.callStatic.isRegistered(bob.address)).to.be.true;
    });

    it('sudo unregister OK', async function () {
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);
      await ab.connect(owner).sudoUnRegister(bob.address);
      expect(await ab.registeredCnt()).to.equal(0);
      expect(await ab.callStatic.isRegistered(bob.address)).to.be.false;
    });

    it('sudo unregister fails, not owner', async function () {
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);
      await expect(ab.connect(bob).sudoUnRegister(bob.address)).to.revertedWith(
        'Ownable: caller is not the owner'
      );
      expect(await ab.registeredCnt()).to.equal(1);
      expect(await ab.callStatic.isRegistered(bob.address)).to.be.true;
    });
  });

  describe('Checks for mocked precompiled contracts', function () {
    it('dapps staking precompile read_staked_amount OK', async function () {
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);
      expect(await dapps.read_staked_amount(validSs58PublicKey)).to.be.equal(staked_amount);
    });

    it('dapps staking precompile read_staked_amount NOK', async function () {
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);
      expect(await dapps.read_staked_amount(invalidPublicKey)).to.be.equal(0);
    });

    it('dapps staking precompile read_staked_amount_on_contract OK', async function () {
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);
      expect(
        await dapps.read_staked_amount_on_contract(stakedOnContract, validSs58PublicKey)
      ).to.be.equal(staked_amount);
    });

    it('dapps staking precompile read_staked_amount_on_contract NOK', async function () {
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);
      expect(
        await dapps.read_staked_amount_on_contract(notStakedContract, validSs58PublicKey)
      ).to.be.equal(0);
    });
  });

  describe('Status checks', function () {
    it('checkStakerStatus OK', async function () {
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);
      expect(await ab.checkStakerStatus(bob.address)).to.be.equal(staked_amount);
    });
    it('checkStakerStatusOnContract OK', async function () {
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);
      expect(await ab.checkStakerStatusOnContract(bob.address, stakedOnContract)).to.be.equal(
        staked_amount
      );
    });
  });
});

// Helper function for registration and verification of registration
async function register_and_verify(pubKey, signedMsg, user) {
  expect(await ab.registeredCnt()).to.equal(0);
  expect(await ab.callStatic.isRegistered(user.address)).to.be.false;
  let tx = await ab.connect(user).register(pubKey, signedMsg);
  let receipt = await tx.wait();
  expect(await ab.registeredCnt()).to.equal(1);

  expect(receipt.events[0].args[0]).to.equal(user.address);
  expect(receipt.events[0].event).to.equal('AstarBaseRegistered');

  expect(await ab.callStatic.isRegistered(user.address)).to.be.true;
}

// Helper function for external registration and verification
async function external_register_and_verify(pubKey, signedMsg, user) {
  expect(await abExternal.registeredCnt()).to.equal(0);
  expect(await abExternal.isRegistered(user.address)).to.be.false;
  let tx = await abExternal.connect(user).register(pubKey, signedMsg);
  let receipt = await tx.wait();
  expect(await abExternal.registeredCnt()).to.equal(1);
  expect(await abExternal.isRegistered(user.address)).to.be.true;
}
