const {json} = require("body-parser");
const {User } = require("../models/model");

const userController = {
    //ADD USER
    addUser : async (req, res) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const user = new User(req.body);
            const saveUser = await user.save();
            res.status(200).json(saveUser);
        }
        catch(err){
            res.status(500).json(err)
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
    }
}
module.exports = userController;