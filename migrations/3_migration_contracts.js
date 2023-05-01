const Election = artifacts.require("Election");

module.exports = function(deployer) {
  deployer.deploy(Election).then(async () => {
    const electionContract = await Election.deployed();
    const config = {
      network: "development",
      contractAddress: electionContract.address
    };
    const fs = require("fs");
    fs.writeFileSync(
      "src/config.json",
      JSON.stringify(config, undefined, 2)
    );
  });
};