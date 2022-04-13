// Load dependencies
const { expect } = require('chai');

let AstarBase;
let astarBase;

// Start test block
describe('AstarBase (proxy)', function () {
  beforeEach(async function () {
    AstarBase = await ethers.getContractFactory("AstarBase");
    astarBase = await upgrades.deployProxy(AstarBase);
  });

  // Test case
  it('retrieve returns a value previously initialized', async function () {
    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await astarBase.getVersion()).toString()).to.equal('1');
  });
});