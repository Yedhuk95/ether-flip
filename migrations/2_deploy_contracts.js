const Token = artifacts.require("Token");
const CoinFlip = artifacts.require("CoinFlip");
const retry = require('../src/utils/retry');

module.exports = async function(deployer) {
  await retry(async () => {
    await deployer.deploy(Token);
    const token = await Token.deployed();
    await deployer.deploy(CoinFlip, token.address);
  });
};