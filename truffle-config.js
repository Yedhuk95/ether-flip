const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    sepolia: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://eth-sepolia.g.alchemy.com/v2/eL7lXeGuZsSBzM7OzIXdypeCkV2Fr0Hg`),
      network_id: 11155111,
      //gasPrice: 2000000000, // 2 Gwei (2,000,000,000 wei)
      gas: 5000000, // Adjust if needed
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  compilers: {
    solc: {
      version: "0.8.21",
    }
  }
};