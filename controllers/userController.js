const {json} = require("body-parser");
const {User } = require("../models/model");

const userController = {
    //ADD USER
    addUser : async (req, res) =>{
        try{
            const user = new User(req.body);
            const saveUser = await user.save();
            res.status(200).json(saveUser);
        }
        catch(err){
            res.status(500).json(err)
        }
    }
}
module.exports = userController;