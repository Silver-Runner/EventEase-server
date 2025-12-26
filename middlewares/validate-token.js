const jwt = require("jsonwebtoken");
const validateToken = (req,res,next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  try {
    const token = authHeader.split(" ")[1];
    if(!token){
      return res.status(401).json({message: "Unauthorized"});
    }
    const decryptedObj = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = decryptedObj;
    next();
  } catch (error) {
    res.status(401).json({message: "invalid token"})
  }
}

module.exports = validateToken;