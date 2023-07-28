const jwt = require("jsonwebtoken")

exports.authUser = async (req, res, next) => {
    try {
        let tmp = req.header("Authorization");
        const token = tmp ? tmp.slice(7, tmp.length) : "";
        // const token =req.header["Authorization"].split(' ')[1]
        // const token = req.headers.authorization.replace('Bearer ', '')

        if (!token) {
            return res.status(400).json({ message: "Invalid Token" });
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
            if (err) {
                return res.status(400).json({ message: "Invalid Authorization" });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}