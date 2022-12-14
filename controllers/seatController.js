const {json} = require("body-parser")
const {Seat,Room,Schedule} = require("../models/model")

const seatController = {
    //ADD SEAT
    addSeat: async(req,res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const seat = new Seat(req.body);
            const saveSeat = await seat.save();
            res.status(200).json(saveSeat);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    // GET ALL SEAT
    getAllSeat: async(req , res) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const schedule = await Schedule.findById(req.params.id);
            const roomId = schedule.room;
            const seat = await Seat.find({room:`${roomId}`});
            res.status(200).json(seat);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    
}

module.exports = seatController;