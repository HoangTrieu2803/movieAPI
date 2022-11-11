const router = require("express").Router();
const userController = require("../controllers/userController");
const createError = require("http-errors")
const {User} = require("../models/model")
const {signAccessToken , signRefreshToken, verifyAccessToken} = require("../validation/jwt");
const middlewareController = require("../controllers/middlewareController");
//REGISTER
router.post("/register", userController.addUser);
//GET ALL USER
router.get("/",middlewareController.verifyToken,userController.getAllUser);
//LOGIN
router.post("/login",userController.loginUser);
//DELETE
router.delete("/delUser/:id",userController.deleteUser);

//REFRESH
router.post("/refresh",userController.refreshToken)
//LOGOUT
router.post("/logout",middlewareController.verifyToken,userController.logoutUser)





//SIGN UP
// router.post("/signup",async(req,res,next)=>{
//     try{
//         // const {email , password} = req.body
//         const result = await authSchema.validateAsync(req.body)
//         // if(!email || !password) throw createError.BadRequest() 
//         const doseExist = await User.findOne({email:result.email})
//         if (doseExist) throw createError.Conflict(`${result.email} đã tồn tại`)
//         const user = new User(result)
//         const saveUser = await user.save();
//         const accessToken = await signAccessToken(saveUser.id)
//         const refreshToken = await signRefreshToken(saveUser.id)
//         res.send({accessToken, refreshToken})
//     }
//     catch(err){
//         if(err.isJoi === true) err.status= 422
//         next(err)
//     }
// });
// router.post("/login", async(req,res,next)=>{
//     try{
//         const result = await authSchema.validateAsync(req.body);
//         const user = await User.findOne({email:result.email})
//         if(!user) throw createError.NotFound("User khong ton tai")
//         const isMatch = await user.isValidPassword(result.password)
//         if(!isMatch) throw createError.Unauthorized("Sai mat khau")
//         const accessToken = await signAccessToken(user.id);
//         const refreshToken = await signRefreshToken(user.id)

//         res.send({accessToken,refreshToken})
//     }
//     catch(err){
//         if(err.isJoi === true) return next(createError.BadRequest("Tai khoan hoac mat khau khong ton tai"))
//         next(err);
//     }
// })
// router.post("/refresh-toke" , async(req, res , next)=>{
//     try{
//         const {refreshToken} = req.body
//         if(!refreshToken) throw createError.BadRequest();
//         const userId= await verifyAccessToken(refreshToken)
//         const accessToken = await signAccessToken(userId);
//         const refreshToken1 = await signRefreshToken(userId);
//         res.send({accessToken,refreshToken1})

//     }
//     catch(err){
//         next(err);
//     }
// })
module.exports = router;