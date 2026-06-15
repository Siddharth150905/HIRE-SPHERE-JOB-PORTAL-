const jwt=require("jsonwebtoken");
exports.protect=async(req,res,next)=>{
    try{
        let token;
        if(
            req.headers.authorization &&  req.headers.authorization.startsWith("Bearer")
        ){
            token=req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Not authorized",
            });
        }

        const decoded=jwt.verify(token,process.env.JWT_ACCESS_SECRET);
        req.user=decoded;
        next();
    }
    catch(error){
           return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
    }
}


exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try{

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }
        
        next();
    }catch(error){
        next(error);    
    }
    
    };
};