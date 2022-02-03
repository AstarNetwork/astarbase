const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AstarBase", function () {

  let AstarBase;
  let astarbase;
  let owner;
  let bob;
  let charlie;
  let addrs;
  const FREE_ADDRESS = '0x0000000000000000000000000000000000000000';
  aliceSignedMsg = "0x0658b0c278f5756fd09be55e61fa711d07bdca8e93f5839249d0494fe5d5ff387adab66bcdde2074f4bd37d832e75bda6a787f26f1685c1d328773cda41f2182";
  alicePublicKey = "0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d";

  beforeEach(async function () {
    AstarBase = await ethers.getContractFactory("AstarBase");
    // const myContract = await ethers.getContractAt("AstarBase", "0x0000000000000000000000000000000000005001");
    astarbase = await AstarBase.deploy();
    [owner, bob, charlie, ...addrs] = await ethers.getSigners();
    await astarbase.deployed();

    const dappsStakingContract = await ethers.getContractAt("DappsStaking", 0x0000000000000000000000000000000000005001);
    const sr25519 = await ethers.getContractAt("SR25519", 0x0000000000000000000000000000000000005002);

  });

  // describe("Deploy", function () {
  //   it("Should set the right owner", async function () {
  //     expect(await astarbase.owner()).to.equal(owner.address);
  //   });
  // });


  describe("Registering", function () {
  //   it("Should fail to register while contract is paused", async function () {
  //     await astarbase.deployed();
  //     expect(astarbase.register(alicePublicKey, aliceSignedMsg)).to.be.revertedWith("The contract is paused");
  //   });

  //   // it("Should fail to unRegister while contract is paused", async function () {
  //   //   await astarbase.deployed();
  //   //   expect(astarbase.unRegister()).to.be.revertedWith("The unRegistration is paused");
  //   // });

    it("Should register account", async function () {
      // await astarbase.deployed();
      await astarbase.pause(false);

      // chack failures
      // expect(astarbase.register(0)).to.be.revertedWith("Can't register polkadotAddr with 0");
      // expect(await astarbase.isRegistered(owner.address)).to.be.false;

      // register
      expect(await astarbase.register(alicePublicKey, aliceSignedMsg)).to.be.ok;
      expect(await astarbase.isRegistered(owner.address)).to.be.true;

      // check state counter and maps
      expect(await astarbase.registeredCnt()).to.equal(1);
      expect(await astarbase.addressMap(owner.address)).to.be.equal(100);
    });

    // it("Should unRegister account", async function () {
    //   await astarbase.deployed();
    //   await astarbase.pause(false);

    //   // register and unregister by user other than owner
    //   expect(await astarbase.connect(bob).register(200)).to.be.ok;
    //   expect(await astarbase.registeredCnt()).to.equal(1);
    //   expect(await astarbase.connect(bob).unRegister()).to.be.ok;
    //   expect(await astarbase.registeredCnt()).to.equal(0);
    //   expect(await astarbase.polkadotAddrMap(200)).to.be.equal(FREE_ADDRESS);
    //   expect(await astarbase.addressMap(bob.address)).to.equal(0);
    // });

    // it("Should unRegister any address by contract owner", async function () {
    //   await astarbase.deployed();
    //   await astarbase.pause(false);

    //   //Bob registers address
    //   expect(await astarbase.connect(bob).register(100)).to.be.ok;

    //   // Charlie fails to call this function
    //   expect(astarbase.connect(charlie).sudoUnRegister(bob.address)).to.be.revertedWith('Ownable: caller is not the owner');
    //   expect(await astarbase.registeredCnt()).to.equal(1);
    //   expect(await astarbase.addressMap(bob.address)).to.equal(100);

    //   // Owner fails to unregister unknown address
    //   expect(astarbase.connect(owner).sudoUnRegister(charlie.address)).to.be.revertedWith('Unregistring unknown entry');

    //   // Owner unregisters address
    //   expect(await astarbase.connect(owner).sudoUnRegister(bob.address)).to.be.ok;
    //   expect(await astarbase.registeredCnt()).to.equal(0);
    //   expect(await astarbase.polkadotAddrMap(100)).to.be.equal(FREE_ADDRESS);
    //   expect(await astarbase.addressMap(bob.address)).to.equal(0);

    // });

    // it("Should change already registered account", async function () {
    //   await astarbase.deployed();
    //   await astarbase.pause(false);

    //   expect(await astarbase.connect(bob).register(100)).to.be.ok;
    //   expect(await astarbase.isRegistered(bob.address)).to.be.true;
    //   expect(await astarbase.registeredCnt()).to.equal(1);

    //   // Changing unknown address should fail
    //   expect(
    //     astarbase.connect(charlie).changeRegistered(200)).to.be.revertedWith("Changing unregistered entry");
    //   expect(await astarbase.addressMap(bob.address)).to.equal(100);
    //   expect(await astarbase.registeredCnt()).to.equal(1);

    //   // Change address to 0 should fail
    //   expect(
    //     astarbase.connect(bob).changeRegistered(0)).to.be.revertedWith("Can't changeRegistered polkadotAddr with 0");
    //   expect(await astarbase.addressMap(bob.address)).to.equal(100);
    //   expect(await astarbase.registeredCnt()).to.equal(1);
    // });

    // it("Should fail to change address", async function () {
    //   await astarbase.deployed();
    //   await astarbase.pause(false);

    //   expect(await astarbase.connect(bob).register(100)).to.be.ok;
    //   expect(await astarbase.isRegistered(bob.address)).to.be.true;
    //   expect(await astarbase.registeredCnt()).to.equal(1);

    //   // Changing unknown address should fail
    //   // expect(astarbase.connect(charlie.address).changeRegistered(200)).to.be.revertedWith("Changing unregistered entry");
    //   expect(await astarbase.addressMap(bob.address)).to.equal(100);
    //   expect(await astarbase.registeredCnt()).to.equal(1);

    //   // Change address to 0 should fail
    //   expect(astarbase.connect(bob).changeRegistered(0)).to.be.revertedWith("Can't changeRegistered polkadotAddr with 0");
    //   expect(await astarbase.addressMap(bob.address)).to.equal(100);
    //   expect(await astarbase.registeredCnt()).to.equal(1);

    //   // Change to already existing address
    //   expect(await astarbase.connect(charlie).register(200)).to.be.ok;
    //   expect(await astarbase.registeredCnt()).to.equal(2);
    //   expect(astarbase.connect(charlie).changeRegistered(100)).to.be.revertedWith("Already used staker's address");
    //   expect(await astarbase.addressMap(bob.address)).to.equal(100);
    //   expect(await astarbase.registeredCnt()).to.equal(2);
    // });
  });
});
