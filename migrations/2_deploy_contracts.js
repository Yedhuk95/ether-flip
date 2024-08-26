const CoinFlip = artifacts.require("CoinFlip");
const retry = require('../src/utils/retry');

module.exports = async function(deployer) {
  await retry(async () => {
    await deployer.deploy(CoinFlip);
  });
};