const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('SimpleStorage', () => {
  let simpleStorageFactory;
  let simpleStorage;
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');

    simpleStorage = await simpleStorageFactory.deploy();
  });

  it('should start with favourite number 0', async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = '0';

    assert.equal(currentValue.toString(), expectedValue);
  });

  it('should update when call store', async () => {
    const expectedValue = '7';
    const transactionResponse = await simpleStorage.store('7');
    await transactionResponse.wait(1);
    const currentValue = await simpleStorage.retrieve();

    assert.equal(currentValue.toString(), expectedValue);
  });
});
