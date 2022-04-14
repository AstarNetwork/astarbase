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
    AstarBase = await ethers.getContractFactory("AstarBase");
    AstarBaseV2 = await ethers.getContractFactory("AstarBaseV2");

    astarBase = await upgrades.deployProxy(AstarBase);
    astarBaseV2 = await upgrades.upgradeProxy(astarBase.address, AstarBaseV2);
  });

  // Test case
  it('retrieve returns a value previously incremented', async function () {
    expect((await astarBaseV2.getVersion()).toString()).to.equal('2');
  });
});