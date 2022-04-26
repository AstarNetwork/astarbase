// test/AstarBaseV2.proxy.js
// Load dependencies
const { expect } = require('chai');

let AstarBase;
let AstarBaseV2;
let astarBase;
let astarBaseV2;

// Start test block
describe('AstarBaseV2 (proxy)', function () {
  beforeEach(async function () {
    AstarBase = await ethers.getContractFactory('AstarBase');
    NewAstarBase = await ethers.getContractFactory('AstarBaseV2');

    astarBase = await upgrades.deployProxy(AstarBase);
    newAstarBase = await upgrades.upgradeProxy(astarBase.address, NewAstarBase);
  });

  // Test case
  it('retrieve returns a value previously incremented', async function () {
    let tx = await newAstarBase.getVersion();

    let receipt = await tx.wait();
    expect(receipt.events[0].data).to.equal(
      '0x0000000000000000000000000000000000000000000000000000000000000002'
    );
  });
});
