const json = require("body-parser");
const {Cinema , Room} = require("../models/model")


const cinemaController = {
    //ADD CINEMA
    addCinema : async(req,res) =>{
        try{
            const cinema = new Cinema(req.body);
            const saveCinema  = await cinema.save();
            res.status(200).json(saveCinema);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    //GET A CINEMA
    getACinema: async(req,res) =>{
        try{
            const cinema = await Cinema.findById(req.params.id).populate("room");
            res.status(200).json(cinema)
        }
        catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports = cinemaController;