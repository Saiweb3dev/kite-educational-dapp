// Importing necessary packages
const dotenv = require('dotenv');
 require("hardhat-deploy");
require("@nomicfoundation/hardhat-toolbox")
// Configuring dotenv
dotenv.config();

// Defining the Hardhat configuration object
const config = {
  networks: {
    hardhat: {
      chainId: 31337,
    },
    // Other networks...
  },  
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  gasReporter: {
    currency: "USD",
    enabled: true,
    src: "./contracts",
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v6"
  }
};

// Exporting the configuration
module.exports = config;
