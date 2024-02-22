
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "You are not Authenticated" });
    };

    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid!" });
        };

        req.userId = data.id;

        next();
    });

};

module.exports = verifyToken;



