// Importing necessary libraries: ethers for Ethereum-related operations and jsonwebtoken for handling JWT tokens
const { ethers } = require("ethers");
const jwt = require('jsonwebtoken');

// This function handles the admin verification process
exports.adminVerification = async (req, res) => {
  // Retrieving the secret key from environment variables for signing the JWT token
  const SECRET_KEY = process.env.SECRET_KEY_FOR_AUTH;

  try {
    // Extracting the signature, address, and message from the request body
    const { signature, address } = req.body;
    const message = "Sign this message to authenticate";

    // Checking if all required fields are present
    if (!signature || !message || !address) {
      // If any field is missing, returning a 400 status code with an error message
      return res.status(400).json({ error: "Missing required fields for admin authentication" });
    }

    // Variable to store the recovered address after verifying the signature
    let recoveredAddress;

    // Attempting to verify the Ethereum signature
    try {
      recoveredAddress = ethers.verifyMessage(message, signature);
    } catch (error) {
      // Logging the error and returning a 400 status code with an error message if the signature verification fails
      console.error('Error in Ethereum signature verification:', error);
      return res.status(400).json({ error: "Invalid signature for authentication" });
    }

    // Comparing the recovered address with the provided address
    if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
      // If they match, creating a JWT token with the address as payload and sending it back in the response
      const token = jwt.sign({ address }, SECRET_KEY, {
        expiresIn: "1h"
      });
      res.json({ token });
    } else {
      // If the addresses do not match, returning a 401 status code with an error message
      res.status(401).json({ error: "Signature does not match the provided address" });
    }
  } catch (error) {
    // Catching any other errors that might occur during the process
    console.error('Error in /auth endpoint:', error);
    // Returning a 500 status code with an internal server error message
    res.status(500).json({ error: "Internal server error" });
  }
}
