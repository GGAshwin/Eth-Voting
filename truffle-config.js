const path = require("path");
require("dotenv").config();
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      network_id: "*",
      // host: process.env.IP,
      host:"127.0.0.1",
      // port: 7545, // for ganache gui
      port: 8545, // for ganache-cli
      gas: 6721975,
      gasPrice: 20000000000,
    },
    // ganache: {
    //   host: "https://sour-queens-take-122-50-194-9.loca.lt",
    //   port: 80,
    //   network_id: "*" // Match any network id
    // }
  },
};
