
const  {json}  = require("body-parser");
const { model } = require("mongoose");
const {Movie,Schedule,Room,Cinema} = require("../models/model");
const scheduleController = {
    //ADD SCHEDULE
    addSchedule: async (req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
       try{
        const newSchedule = new Schedule(req.body);
        const saveSchedule = await newSchedule.save();
        if(req.body.movie){
            const movie = Movie.find({_id: req.body.movie})
            await movie.updateOne({$push: {schedule: saveSchedule._id}})
        }
        if(req.body.room){
            const room = Room.find({_id: req.body.room})
            await room.updateOne({$push:{schedule: saveSchedule._id}})
        }
        res.status(200).json(saveSchedule)  
       }catch(err){
        res.status(500).json(err);
       }
    },
    //GET A SCHEDULE
    getASchedule : async(req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
        const schedule = await Schedule.findById(req.params.id).populate("room")
        res.status(200).json(schedule);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //GET ALL SCHEDULE
    getAllSchedule : async(req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{        
            const schedule = await Schedule.find().populate(
                {path:"room",
                populate:{path : "cinema"}
            }
            )
            res.status(200).json(schedule);
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //UPDATE SCHEDULE
    updateSchedule : async(req, res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const schedule = await Schedule.findById(req.params.id);
            await schedule.updateOne({ $set: req.body });
            res.status(200).json("update successfully!");
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //DELETE SCHEDULE
    deleteSchedule: async(req, res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            await Movie.updateMany(
            {schedule: req.params.id},
            {$pull :{schedule: req.params.id}}
            );
            await Room.updateMany(
            {schedule: req.params.id},
            {$pull :{schedule: req.params.id}}
            )
            await Schedule.findById(req.params.id)
            res.status(200).json("delete successfully")
        }
        catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports = scheduleController;