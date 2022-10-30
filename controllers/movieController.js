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
            const movie = await Movie.findById(req.params.id).populate("schedule");
            res.status(200).json(movie)
        }catch(err){
            res.status(500).json(err);
        }
    },
    //DELETE MOVIE
    deleteMovie: async(req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            await Schedule.updateMany({movie: req.params.id},{movie:null})
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json("delete successfully")
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    //UPDATE MOVIE
    updateMovie : async(req , res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        try{
            const movie = await Movie.findById(req.params.id);
            await movie.updateOne({$set : req.body});
            res.status("200").json("Update successfully");
        }
        catch(err){
            res.status("500").json(err);
        }
    }
}

module.exports = movieController;