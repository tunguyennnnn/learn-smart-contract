const { task } = require('hardhat/config');

task('block-number', 'print block number').setAction(async (taskArgs, hre) => {
  const blockNumber = await hre.ethers.provider.getBlockNumber();
  console.log('block-number', blockNumber);
});

module.exports = {};
