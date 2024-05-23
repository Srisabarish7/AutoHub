const jwt = require("jsonwebtoken");
const User = require('../models/userSchema');

const authenticate = async (req, res, next) => {
    try {
        // Extract token from cookies
        const token = req.cookies.jwtoken;

        if (!token) {
            // If no token provided, return 401 Unauthorized
            return res.status(401).send('Unauthorized: No token provided');
        }

        // Verify the token
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        // Find the user associated with the token
        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token":token});

        if (!rootUser) {
            // If user not found, return 401 Unauthorized
            return res.status(401).send('Unauthorized: Invalid token');
        }

        // Set request properties for access in subsequent middleware or route handlers
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // If any error occurs, return 401 Unauthorized
        console.error('Authentication error:', error);
        return res.status(401).send('Unauthorized: Invalid token');
    }
}

module.exports = authenticate;
