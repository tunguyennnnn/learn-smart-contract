const { ethers, run, network } = require('hardhat');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

async function verify(contractAddress, args) {
  console.log('veriyfing contract....');
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already verified!');
    } else {
      console.log('Verify error', e);
    }
  }
}

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');

  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.deployed();

  console.log('simpleStorage', simpleStorage);

  console.log('Desploy contract to', simpleStorage.address);

  console.log(network.config);

  if (network.config.chainId === 4 && process.env.ETH_SCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log('currentValue', currentValue);

  // update the current value
  const transactionResponse = await simpleStorage.store(8);
  await transactionResponse.wait(1);
  const updateValue = await simpleStorage.retrieve();
  console.log('updateValue', updateValue);
}

main().then(() => {
  console.log('done');
  process.exit(0);
});
