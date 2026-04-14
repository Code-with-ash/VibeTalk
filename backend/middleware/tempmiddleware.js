import jwt from "jsonwebtoken";

export const verifyTempToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.isTemp) {
            return res.status(403).json({ message: "Invalid token type" });  // blocks regular tokens
        }

        req.email = decoded.email;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};