import { useEffect, useState } from "react";
import Web3 from "web3";
import { abi, contractAddress } from "../../constants/index"; // Adjust the path as necessary

// Define an interface for the properties of the contract function to be called
interface CallContractFunctionProps {
  functionName: string;
  params?: any[];
  userAddress: string; // Add this line
}

// Define an interface for the contract addresses object
interface ContractAddresses {
  [key: string]: string;
}

// Custom hook for calling contract functions
export const useCallContractFunction = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Cast the imported contract address to match the expected type
  const contractAddressTyped = contractAddress as ContractAddresses;

  let web3: Web3;

  // Check if Web3 is available (e.g., through MetaMask)
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
  } else {
    console.log("No Metamask detected. Please install Metamask!");
    return { callContractFunction: async () => {}, loading, result, error };
  }

  // State to hold the currently selected contract address based on the chain ID
  const [currentContractAddress, setCurrentContractAddress] = useState("");

  useEffect(() => {
    // Function to fetch the current chain ID and set the contract address accordingly
    const fetchChainIdAndSetAddress = async () => {
      try {
        // Fetch the current chain ID
        const chainId = await web3.eth.getChainId();

        // Select the contract address for the current chain ID
        const addressForChain = contractAddressTyped[String(chainId)];

        // If no address is found for the current chain ID, throw an error
        if (!addressForChain) {
          throw new Error(`No contract address found for chain ID ${chainId}`);
        }

        // Update the state with the selected contract address
        setCurrentContractAddress(addressForChain);
      } catch (err) {
        console.error(
          "Error fetching chain ID or setting contract address:",
          err
        );
        // Set the error state based on the caught error
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    // Call the function to set the contract address
    fetchChainIdAndSetAddress();
  }, [web3]); // Dependency array to re-run the effect if the web3 instance changes

  // Create a contract instance using the ABI and the currently selected contract address
  const contractInstance = new web3.eth.Contract(abi, currentContractAddress);

  // Function to call a contract function
  const callContractFunction = async ({
    functionName,
    params,
    userAddress
  }: CallContractFunctionProps) => {
    try {
      setLoading(true); // Set loading state to true


      // Find the function definition in the ABI
      const functionABI = abi.find(
        (f) => f.name === functionName && f.type === "function"
      );

      // Throw an error if the function is not found in the ABI
      if (!functionABI)
        throw new Error(`Function ${functionName} not found in ABI`);

      // Validate the number of parameters passed against the function's expected inputs
      if (params && functionABI.inputs.length !== params.length) {
        throw new Error(
          `Incorrect number of parameters for function ${functionName}`
        );
      }

      // Get the contract method to call
      let method = contractInstance.methods[functionName];

      // If parameters are provided, apply them to the method
      if (params) {
        const constructedMethod = method(...params);
        // Determine if the function is read-only (call) or state-changing (send)
        const isReadOnly =
          functionABI.stateMutability === "view" ||
          functionABI.stateMutability === "pure";
        const result = isReadOnly
          ? await constructedMethod.call({ from: userAddress  })
          : await constructedMethod.send({ from: userAddress  });
        setResult(result);
      } else {
        // Handle case where no params are provided
        const result = await method().call({ from: userAddress  });
        setResult(result);
      }
    } catch (err) {
      console.error("Error calling contract function:", err);
      // Handle errors by updating the error state
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false); // Reset loading state after the operation completes
    }
  };

  // Return the function and state variables for use in components
  return { callContractFunction, loading, result, error };
};
