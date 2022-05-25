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

  // Mock contract checks only last byte
  // for public key 1 is valid value
  // for message 9 is valid value
  const validSs58PublicKey = '0x1111111111111111111111111111111111111111111111111111111111111111';
  const invalidPublicKey = '0x0111111111111111111111111111111111111111111111111111111111111110';
  const validECDSAPublicKey = '0x2222222222222222222222222222222222222222222222222222222222222222';
  const stakedOnContract = '0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa';
  const notStakedContract = '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB';
  const validSignedMsg =
    '0x99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999';
  const invalidSignedMsg =
    '0x88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888';

  const staked_amount = 50; // check dapps staking mock

  beforeEach(async function () {
    [owner, bob] = await ethers.getSigners();

    AstarBase = await ethers.getContractFactory('AstarBase');
    NewAstarBase = await ethers.getContractFactory('AstarBaseV3');
    DappsS = await ethers.getContractFactory('DappsStakingMock');
    Sr25519 = await ethers.getContractFactory('SR25519Mock');
    Ecdsa = await ethers.getContractFactory('ECDSAMock');

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
      expect(await ab.isRegistered(bob.address)).to.be.false;
    });

    it('register fails, double use of ss5 public key', async function () {
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);

      await expect(ab.connect(bob).register(validSs58PublicKey, validSignedMsg)).to.revertedWith(
        'Already used ss58 Public Key'
      );
      expect(await ab.registeredCnt()).to.equal(1);
      expect(await ab.isRegistered(bob.address)).to.be.true;
    });

    // it('register fails, ss5 public key is 0', async function () {
    //   await expect(ab.connect(bob).register(0, validSignedMsg)).to.revertedWith(
    //     "Can't register ss58PublicKey with 0"
    //   );
    //   expect(await ab.registeredCnt()).to.equal(0);
    //   expect(await ab.isRegistered(bob.address)).to.be.false;
    // });

    it('register fails, double use of evm address', async function () {
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);

      await expect(ab.connect(bob).register(validECDSAPublicKey, validSignedMsg)).to.revertedWith(
        'Already registered evm address'
      );
      expect(await ab.registeredCnt()).to.equal(1);
      expect(await ab.isRegistered(bob.address)).to.be.true;
    });

    describe('un Registration', function () {
      it('unregister OK', async function () {
        const fee = await ab.unregisterFee();
        await register_and_verify(validSs58PublicKey, validSignedMsg, bob);
        await ab.connect(bob).unRegister({ value: fee });
        expect(await ab.registeredCnt()).to.equal(0);
        expect(await ab.isRegistered(bob.address)).to.be.false;
      });

      it('unregister fails, Not enough funds to unregister', async function () {
        await register_and_verify(validSs58PublicKey, validSignedMsg, bob);

        await expect(ab.connect(bob).unRegister()).to.revertedWith(
          'Not enough funds to unregister'
        );
        expect(await ab.registeredCnt()).to.equal(1);
        expect(await ab.isRegistered(bob.address)).to.be.true;
      });

      it('unregister fails, unknown address', async function () {
        await register_and_verify(validSs58PublicKey, validSignedMsg, bob);
        const fee = await ab.unregisterFee();
        await expect(ab.connect(owner).unRegister({ value: fee })).to.revertedWith(
          'Unregistring unknown entry'
        );
        expect(await ab.registeredCnt()).to.equal(1);
        expect(await ab.isRegistered(bob.address)).to.be.true;
      });

      it('sudo unregister OK', async function () {
        await register_and_verify(validSs58PublicKey, validSignedMsg, bob);
        await ab.connect(owner).sudoUnRegister(bob.address);
        expect(await ab.registeredCnt()).to.equal(0);
        expect(await ab.isRegistered(bob.address)).to.be.false;
      });

      it('sudo unregister fails, not owner', async function () {
        await register_and_verify(validSs58PublicKey, validSignedMsg, bob);
        await expect(ab.connect(bob).sudoUnRegister(bob.address)).to.revertedWith(
          'Ownable: caller is not the owner'
        );
        expect(await ab.registeredCnt()).to.equal(1);
        expect(await ab.isRegistered(bob.address)).to.be.true;
      });
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
    it('checkStakerStatusOnContract OK', async function () {
      await register_and_verify(validSs58PublicKey, validSignedMsg, bob);
      expect(await ab.checkStakerStatusOnContract(bob.address, stakedOnContract)).to.be.equal(
        staked_amount
      );
    });
  });
});

async function register_and_verify(pubKey, signedMsg, user) {
  expect(await ab.registeredCnt()).to.equal(0);
  expect(await ab.isRegistered(user.address)).to.be.false;
  let tx = await ab.connect(user).register(pubKey, signedMsg);
  let receipt = await tx.wait();
  expect(await ab.registeredCnt()).to.equal(1);

  expect(receipt.events[0].args[0]).to.equal(user.address);
  expect(receipt.events[0].event).to.equal('AstarBaseRegistered');

  expect(await ab.isRegistered(user.address)).to.be.true;
  console.log('User:', user.address);
}
