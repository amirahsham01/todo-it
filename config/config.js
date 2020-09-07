const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ 
            message: "incorrect token",
        });
    }

    try {
        const decoded = jwt.verify(token, "seifewdaystogo");

        req.user = decoded.user;
        next()
    } catch (err) {
        return res.status(401).json({ 
            message: "token is not valid",
        });
    }
}