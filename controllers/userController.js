const {json} = require("body-parser");
const {User } = require("../models/model");
const bcrpyt = require("bcrypt")
const JWT = require("jsonwebtoken")
let refreshTokens = [];
const userController = {
    
    //ADD USER
    addUser : async (req, res) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const salt = await bcrpyt.genSalt(10);
            const hashed = await bcrpyt.hash(req.body.password, salt);
            //create new user
            const newUser = await new User({
                email: req.body.email,
                password: hashed,
            });
            const doseExist = await User.findOne({email:req.body.email});
            if(doseExist){
                res.status(404).json("Email da ton tai")
            }
            const user = await newUser.save()
            res.status(200).json(user);
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //JWT
    signAccessToken : (user) =>{
        const secret = "146e340b4f5dc92f0c800c2aae403f31c244975349c05bc4c186ee603e804b9c"
        return JWT.sign(
            {
                id:user.id,
                admin:user.admin,
            },
            secret,
            {expiresIn: "365d"}
            );
    },
    signRefreshToken : (user) =>{
        const refreshKey = "519ec29f049630e7cd8c3ef795955ced37b5a24f5c51dedb81dc76729eeb3fe8";
        return JWT.sign(
            {
                id:user.id,
                admin:user.admin,
            },
            refreshKey,
            {expiresIn: "365d"}
            );
    },
    //LOGIN
    loginUser : async(req, res) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const user = await User.findOne({email: req.body.email});
            if(!user){
                res.status(404).json("Sai tai khoan");
            }
            const validPassword = await bcrpyt.compare(
                req.body.password,
                user.password
            )
            if(!validPassword)
            {
                res.status(404).json("Sai mat khau")
            }
            if(user && validPassword){
                
                const accessToken= userController.signAccessToken(user);
                const refreshToken= userController.signRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken",refreshToken,{
                    httpOnly:true,
                    secure:false,
                    path:"/",
                    sameSite:"strict",
                })
                res.status(200).json({user,accessToken})
            }
        }
        catch(err){
            res.status(500).json(err);
        }
        
    },
    // GET ALL USER
    getAllUser : async(req,res) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const user = await User.find();
            res.status(200).json(user);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    //DELETE USER
    deleteUser : async(req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const uer = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete success");
        }  
        catch(err){
            res.status(500).json(err);
        }
    },
    //REFRESHTOKEN
    refreshToken:async(req,res)=>{
        const refreshToken =  req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json("You are not authen");
        if(!refreshTokens.includes(refreshToken)){
            return res.status(401).json("Refresh is not valid");
        }
        JWT.verify(refreshToken,"519ec29f049630e7cd8c3ef795955ced37b5a24f5c51dedb81dc76729eeb3fe8",(err,user)=>{
            if(err){
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token)=>token !== refreshToken);
            
            const newAccessToken = userController.signAccessToken(user);
            const newRefreshToken = userController.signRefreshToken(user);
            
            refreshTokens.push(newRefreshToken);
            res.cookie("newrefreshToken",newRefreshToken,{
                httpOnly:true,
                secure:false,
                path:"/",
                sameSite:"strict",
            })
            res.status(200).json({accessToken:newAccessToken})
    })
},
//LOGOUT
    logoutUser : async(req, res)=>{
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("log out");
    }
}
module.exports = userController