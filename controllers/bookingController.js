const json = require("body-parser");
const {Booking , User} = require("../models/model")


const bookingController = {
    //ADD Booking
    addBooking : async(req,res) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const Booking = new Booking(req.body);
            const saveBooking  = await Booking.save();
            res.status(200).json(saveBooking);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    //GET A Booking
    getABooking: async(req,res) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');

        try{
            const Booking = await Booking.findById(req.params.id);
            res.status(200).json(Booking)
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    //GET ALL Booking
    getAllBooking: async(req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const Booking = await Booking.find().populate(
                {path:"room",
                populate:{path : "schedule"}
            }
            );
            res.status(200).json(Booking);
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports = bookingController;