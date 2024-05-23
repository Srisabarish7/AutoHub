const jwt = require("jsonwebtoken");
const Admin = require('../models/adminSchema');

const adminAuthentication = async (req, res, next) => {
    try {
        // Check for the presence of the token cookie
        const token = req.cookies.jwtAdmin;
        if (!token) {
            return res.status(401).send('Unauthorized: No token provided');
        }

        // Verify token validity and extract admin data
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootAdmin = await Admin.findOne({
            $or: [
              { _id: 'admin_id' }// Replace this with the actual _id value
               // Replace this with the actual token value
            ]
          });
                  console.log(verifyToken._id);
        // Handle admin not found case specifically
        if (!rootAdmin) {
            return res.status(401).send('Unauthorized: Invalid token or Admin not found');
        }

        // Attach extracted admin data to the request object
        req.token = token;
        req.rootAdmin = rootAdmin;
        req.adminID = rootAdmin._id;

        next();

    } catch (error) {
        // Handle potential errors during token verification or admin lookup
        console.error(error);
        if (error.name === 'JsonWebTokenError') { // Handle invalid token structure errors
            return res.status(401).send('Unauthorized: Invalid token');
        } else if (error.name === 'TokenExpiredError') { // Handle expired token
            return res.status(401).send('Unauthorized: Token expired');
        } else {
            return res.status(500).send('Internal Server Error'); // Catch unexpected errors
        }
    }
};

module.exports = adminAuthentication;
