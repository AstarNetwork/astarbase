// test/AstarBaseV2.proxy.js
// Load dependencies
const { expect } = require('chai');

let AstarBase;
let astarBase;

// Start test block
describe('AstarBaseV2 (proxy)', function () {
  beforeEach(async function () {
    AstarBase = await ethers.getContractFactory('AstarBaseV2');
    NewAstarBase = await ethers.getContractFactory('AstarBaseV3');

    astarBase = await upgrades.deployProxy(AstarBase);
    newAstarBase = await upgrades.upgradeProxy(astarBase.address, NewAstarBase);
  });

  // Test case
  it('retrieve returns a value previously incremented', async function () {
    let tx = await newAstarBase.getVersion();

    let receipt = await tx.wait();
    expect(receipt.events[0].data).to.equal(
      '0x0000000000000000000000000000000000000000000000000000000000000003'
    );
  });
});
