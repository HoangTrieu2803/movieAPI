const  {json}  = require("body-parser");
const {Movie,Schedule} = require("../models/model");

const movieController = {
    //ADD MOVIE
    addMovie : async(req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const newMovie = new Movie(req.body);
            const saveMovie = await newMovie.save();
            res.status(200).json(saveMovie)  
        }catch(err){
            res.status(500).json(err);
        }
    },
    // GET ALL MOVIE
    getAllMovie: async(req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const movie = await Movie.find();
            res.status(200).json(movie);
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //GET A MOVIE
    getAMovie: async(req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const movie = await Movie.findById(req.params.id);
            res.status(200).json(movie)
        }catch(err){
            res.status(500).json(err);
        }
    },
    //DELETE MOVIE
    deleteMovie: async(req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');

        try{
            await Schedule.findByIdAndRemove({_id: req.body.schedule})
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json("success")
        }
        catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports = movieController;