const  {json}  = require("body-parser");
const {Movie,Schedule} = require("../models/model");
const scheduleController = {
    //ADD SCHEDULE
    addSchedule: async (req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
       try{
        const newSchedule = new Schedule(req.body);
        const saveSchedule = await newSchedule.save();
        if(req.body.movie){
            const movie = Movie.find({_id: req.body.movie})
            await movie.updateOne({schedule: saveSchedule._id})
        } 
        res.status(200).json(saveSchedule)  
       }catch(err){
        res.status(500).json(err);
       }
    //GET AN SCHEDULE
    },
    getASchedule : async(req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
        const schedule = await Schedule.findById(req.params.id).populate("movie")
        res.status(200).json(schedule);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //GET ALL SCHEDULE
    getAllSchedule : async(req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const schedule = await Schedule.find();
            res.status(200).json(schedule);
        }
        catch(err){
            res.status(500).json(err)
        }
    }
}
module.exports = scheduleController;