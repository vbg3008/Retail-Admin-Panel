const jwt = require("jsonwebtoken");


const verifiedUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET); // Verify token
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};

module.exports = verifiedUser;
