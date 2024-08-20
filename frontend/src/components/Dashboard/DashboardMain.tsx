"use client"
import { useAccount } from "wagmi";
import { useCallContractFunc } from "@/hooks/useCallContract";
import { useState } from "react";


const DashboardMain: React.FC= () => {
  // State to hold the course ID entered by the user, typed as string
  const [courseId, setCourseId] = useState<string>("");
  // State to hold the contract result. Initialized as null so nothing is shown initially.
  // Typed as number | null to allow numeric values or null
  const [contractResult, setContractResult] = useState<number | null>(null);
  // Hook to get the current user's address, assuming useAccount returns an object with an address field typed as string | undefined
  const { address } = useAccount();
  // Custom hook to interact with the smart contract, assuming it returns an object with the specified fields
  const { callContractFunction, loading, result, error } = useCallContractFunc();

  // Function to handle checking the user's balance for a specific course
  const handleCheck = async () => {
    console.log("Checking...");
    try {
      // Call the smart contract function with the specified parameters
      // Assuming callContractFunction expects an object with functionName, params, and userAddress fields
      const txResponse = await callContractFunction({
        functionName: "checkUserBalance",
        params: [courseId],
        userAddress: address ?? "", // Fallback to empty string if address is undefined
      });
      console.log("Response from dashboard -->", txResponse);
      // Update the contract result state with the numeric value obtained from the response
      // Assuming txResponse is a string that can be converted to a number
      setContractResult(Number(txResponse));
    } catch (error) {
      console.error("Error checking balance:", error);
      // Optionally handle errors here (e.g., show an error message)
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-10 text-blue-500">
      <h1 className="text-4xl font-semibold mb-8">Welcome, {address?.substring(0, 10)}...</h1>
      <div className="flex flex-col justify-center items-center space-y-6 bg-white shadow-md rounded-lg p-10 w-full max-w-md">
        <span className="text-xl font-medium">Check my course token available</span>
        <label className="block text-gray-700" htmlFor="">Enter the course id</label>
        <input
          className="w-full px-3 py-2 bg-white border border-blue-700 placeholder-gray-500 text-gray-900 rounded-lg focus:shadow-outline"
          type="number"
          onChange={(e) => setCourseId(e.target.value)}
        />
        <button
          className="w-full px-3 py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none"
          onClick={handleCheck}
        >
          Check
        </button>
        {contractResult !== null && (
          <p className="mt-4 text-xl font-bold text-blue-700">
            Token available: {contractResult}
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardMain;
