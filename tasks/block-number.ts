import { task } from 'hardhat/config';

export default task('block-number', 'print block number').setAction(
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log('block-number', blockNumber);
  }
);
