const hre = require("hardhat");

async function main() {
  const KITE_EEDU_NFT_FACTORY = await hre.ethers.getContractFactory("KITE_EEDU_NFT");
  const KITE_EEDU_NFT = await KITE_EEDU_NFT_FACTORY.deploy("0xC2F20D5c81F5B4450aA9cE62638d0bB01DF1935a");

  const contractAddress = KITE_EEDU_NFT.target;  // Contract address should now be available
  console.log(`The KITE_EEDU_NFT Contract deployed at ${contractAddress}`);


  const abi = KITE_EEDU_NFT_FACTORY.interface.formatJson();
  const abiFormatted = JSON.parse(abi);

  // Assuming deployments is available as it would be in a Hardhat environment
  await hre.deployments.save("KITE_EEDU_NFT", {
    abi: abiFormatted,
    address: contractAddress,
  });
}

main()
  .then(() => process.exit(0)) // Exit with success status code if deployment is successful
  .catch((error) => {
    console.error(error); // Log any errors that occur during deployment
    process.exit(1); // Exit with error status code if deployment fails
  });
