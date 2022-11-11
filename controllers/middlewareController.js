const JWT = require("jsonwebtoken");
const middlewareController = {
    //verifyToken
    verifyToken:(req,res,next)=>{
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            JWT.verify(accessToken, "146e340b4f5dc92f0c800c2aae403f31c244975349c05bc4c186ee603e804b9c",(err,user)=>{
                if(err){
                    res.status(403).json("Token is not valid")
                }
                req.user=user;
                next();
            })
        }
        else{
            res.status(401).json("khong co quyen truy cap")
        }
    },
    verifyAdminToken:(req,res,next)=>{
        middlewareController.verifyToken(req,res,()=>{
            if(req.user.id == req.params.id || req.user.admin){
                next()
            }
            else{
                res.status(403).json("Khong co quyen truy cap")
            }
        })
    }
}
module.exports = middlewareController;