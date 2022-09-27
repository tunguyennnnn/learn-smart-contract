require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();
require('@nomiclabs/hardhat-etherscan');
require('hardhat-gas-reporter');
require('./tasks/block-number');
require('solidity-coverage');

const rinkebyURL = process.env.RINKEBY_RPC_URL;
const rinkebyPrivateKey = process.env.PRIVATE_KEY;
const ethScanAPIKey = process.env.ETH_SCAN_API_KEY;
const coinMarketCapAPIKey = process.env.COIN_MARKET_CAP_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    rinkeby: {
      url: rinkebyURL,
      accounts: [rinkebyPrivateKey],
      chainId: 4,
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ethScanAPIKey,
  },
  gasReporter: {
    enabled: true,
    noColors: true,
    // outputFile: 'gas-reporter.txt',
    currency: 'USD',
    coinmarketcap: coinMarketCapAPIKey,
  },
  solidity: '0.8.17',
};
