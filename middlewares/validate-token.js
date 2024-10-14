const jwt = require("jsonwebtoken");
const validateToken = (req,res,next) => {
  try {
    const token = req.cookies.token;
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