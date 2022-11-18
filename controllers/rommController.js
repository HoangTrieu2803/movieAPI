const  {json}  = require("body-parser");
const {Room , Cinema} = require("../models/model")
//ADD ROOM
const roomController = {
    //ADD ROOM
    addRoom: async(req , res) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const room = new Room(req.body);
            const saveRoom = await room.save();
            if(req.body.cinema){
                const cinema = Cinema.find({_id: req.body.cinema})
                await cinema.updateOne({$push:{room: saveRoom._id}});
            } 
            res.status(200).json(saveRoom);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    //GET A ROOM
    getARoom: async(req,res) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const room = await Room.findById(req.params.id).populate("schedule")
            res.status(200).json(room);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    //GET ALL ROOM
    getAllRoom: async(req,res) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const room = await Room.find();
            res.status(200).json(room);
        }
        catch(err){
            res.status(500).json(err)
        }
    }
}
module.exports = roomController;
