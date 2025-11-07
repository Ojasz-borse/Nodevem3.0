import User from "../model/user.model";

export const protectRoute = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    
    try {   
        const decoded = jwt.verify(token, process.env.JWT_SECRET);      
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        req.user = user; 
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}
