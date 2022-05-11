// Load dependencies
const { expect } = require('chai');

let AstarBase;
let astarBase;

// Start test block
describe('AstarBase (proxy)', function () {
  beforeEach(async function () {
    AstarBase = await ethers.getContractFactory("AstarBaseV3");
    astarBase = await upgrades.deployProxy(AstarBase);
  });

  // Test case
  it('retrieve returns a value previously initialized', async function () {
    let tx = await astarBase.getVersion();

    let receipt = await tx.wait();
    expect(receipt.events[0].data).to.equal('0x0000000000000000000000000000000000000000000000000000000000000003');
  });
});