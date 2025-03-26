const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node");

// Middleware to protect routes
const requireAuth = ClerkExpressWithAuth({
    onError: (err, req, res) => {
        res.status(401).json({ success: false, message: "Unauthorized access" });
    },
});

module.exports = requireAuth;
