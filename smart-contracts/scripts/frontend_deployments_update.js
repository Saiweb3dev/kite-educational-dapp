const fs = require("fs");
const hre = require("hardhat");

const FRONT_END_ABI_FILE = "../frontend/constants/KITE_EEDU_NFT_ABI.json";
const FRONT_END_ADDRESS_FILE = "../frontend/constants/KITE_EEDU_NFT_ADDRESS.json";


const main = async () => {
  if(true){
    console.log("Writing to front end...")
    const contract = await deployments.get("KITE_EEDU_NFT")
    const contractABI = contract.abi;
    const contractAddress = contract.address;
    console.log("ABI updated",contractABI)
    await updateAbi(contractABI);
    console.log("Contract updated",contractAddress);
    await updateContractAddresses(contractAddress);
  }
  else{
    console.log("NO Permission Given")
    console.log(process.env.UPDATE_FRONT_END)
  }
}

async function updateAbi(contractABI){
  console.log("Updating the ABI to FrontEnd")
  const abiJson = JSON.stringify(contractABI,null,2);
  fs.writeFileSync(FRONT_END_ABI_FILE,abiJson);
}

async function updateContractAddresses(contractAddress){
  console.log("Updating the Addresses to FrontEnd");
  try{
    const chainId = hre.network.config.chainId;
    if(chainId === undefined){
      console.log("Chain ID is undefined. Cannot update contract addresses.")
      return;
    }
    // Initialize addressData as an empty object
    let addressData = {};

    // Check if the file exists
    if(fs.existsSync(FRONT_END_ADDRESS_FILE)){
      const fileContent = fs.readFileSync(FRONT_END_ADDRESS_FILE, 'utf8');
      // Check if the file is not empty
      if(fileContent.trim()!== ''){
        // Safely parse the file content
        try {
          addressData = JSON.parse(fileContent);
        } catch (error) {
          console.log("Error parsing JSON from file:", error);
          // Optionally, handle the error (e.g., log it, throw it, or reset addressData to {})
          // For simplicity, we'll reset addressData to an empty object here
          addressData = {};
        }
      }
    }

    // Update the addresses object with the new address
    addressData[chainId] = contractAddress;
    // Write the updated addresses back to the file
    const addressJson = JSON.stringify(addressData, null, 2);
    fs.writeFileSync(FRONT_END_ADDRESS_FILE, addressJson);
    console.log("Updated contract address for network ID", chainId, "to", contractAddress);
  }catch(error){
    console.log("Error in updating address", error)
  }
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error)
  process.exit(1);
})
