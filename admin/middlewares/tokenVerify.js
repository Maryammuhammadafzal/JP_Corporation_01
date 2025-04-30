import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  
  const authHeader = req?.headers["authorization"];
  

  if (!authHeader) {
    return res?.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Split "Bearer <token>"


  if (!token) {
    return res?.status(403).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
verifyToken()
export default verifyToken;