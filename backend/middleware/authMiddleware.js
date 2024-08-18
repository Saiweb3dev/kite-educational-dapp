// Importing the jsonwebtoken library for handling JWT tokens
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Secret key for signing/verifying JWT tokens, should be replaced with a strong, unique secret in production environments
const SECRET_KEY = process.env.SECRET_KEY_FOR_AUTH;

// Array containing the addresses of authorized admins
const ADMIN_ADDRESSES = [
  '0xC2F20D5c81F5B4450aA9cE62638d0bB01DF1935a',
  '0x456...' // Truncated for brevity
];

// Middleware function to authenticate requests using JWT tokens
const authMiddleware = (req, res, next) => {
  // Extracting the authorization header from the request
  const token = req.headers['authorization'];

  // Checking if a token was provided
  if (!token) {
    // If no token is provided, returning a 403 status code with an error message
    return res.status(403).send('No token provided');
  }
  console.log(token)
  console.log(SECRET_KEY)

  // Verifying the JWT token using the secret key
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      // If there's an error during verification, returning a 401 status code with an error message
      console.log(err)
      return res.status(401).send('Invalid token');
    }

    // Checking if the decoded address is included in the list of admin addresses
    if (!ADMIN_ADDRESSES.includes(decoded.address)) {
      // If the address is not recognized as an admin, returning a 403 status code with an error message
      return res.status(403).send('Not authorized');
    }

    // If the token is valid and the address is authorized, attaching the decoded address to the request object
    // and proceeding to the next middleware or route handler
    req.userAddress = decoded.address;
    next();
  });
};

// Exporting the middleware function for use in other parts of the application
module.exports = authMiddleware;
