import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    // Check if token exists in cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Attach user ID to the request object
    req.id = decoded.userId;
    console.log(req.id);  // Optional: For debugging purposes

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    // Handle error, send a response with a 401 status
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default isAuthenticated;
