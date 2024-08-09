const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']; // Bearer TOKEN
    if (!token) return res.status(403).send({ message: 'A valid token is required for authentication' });

    try {
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY'); // Replace YOUR_SECRET_KEY with your actual secret
        req.admin = decoded;
        next();
    } catch (err) {
        res.status(401).send({ message: 'Invalid Token' });
    }
};

module.exports = authMiddleware;
