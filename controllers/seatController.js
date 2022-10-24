const {json} = require("body-parser")
const {Seat} = require("../models/model")

const seatController = {
    //ADD SEAT
    addSeat: async(req,res) => {
        try{
            const seat = new Seat(req.body);
            const saveSeat = await seat.save();
            res.status(200).json(saveSeat);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports = seatController;