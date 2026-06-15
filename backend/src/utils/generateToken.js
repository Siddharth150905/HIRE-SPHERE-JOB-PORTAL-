const jwt=require("jsonwebtoken");

const generateAccessToken=(userId,role)=>{
    return jwt.sign(
        {
            userId,
            role,
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRE
        }
    );
};



const generateRefreshToken=(userId)=>{
    return jwt.sign(
        {
            userId,
        }
        ,
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRE,
        }
    )
}

module.exports={
    generateAccessToken,
    generateRefreshToken
    }

