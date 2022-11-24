const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");
const string = require("@hapi/joi/lib/types/string");
const { type } = require("@hapi/joi/lib/extend");
//MOVIE
const movieShema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
  },
  publishedYear: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  genres: {
    type: [String],
  },
  img: {
    type: String,
  },
  trailer:{
    type:String
  },
  schedule:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Schedule"
    }
  ],
});
//SCHEDULE
const scheduleChema = new mongoose.Schema({
  openingDate: {
    type: String,
    require: true,
  },
  time_start: {
    type: String,
    require: true,
  },
  time_end: {
    type: String,
    require: true,
  },
  movie: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Movie"
  },
  room:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Room",
    cinema:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Cinema"
    }
  },
  
});
//ROOM
const roomSchema = new mongoose.Schema({
  cinema:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Cinema"
  },
  name:{
    type:String
  },
  schedule:[
    {type:mongoose.Schema.Types.ObjectId,
    ref:"Schedule"}
  ]
})
//CINEMA
const cinemaSchema = new mongoose.Schema({
  name:{
    type:String
  },
  address:{
    type:String
  },
  room:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Room",
    }
  ],
  img:{
    type:String
  }
})
//SEAT
const seatSchema = new mongoose.Schema({
  room:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Room"
  },
  row:{
    type:String,
  },
  listSeat:[
    {col:{type:String},price:{type:String},isSelect:{type:Boolean}}
  ]
})
//BOOKING
const bookingSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  schedule:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Schedule"
  },
  seat:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Seat"
  },
  price:{
    type:Number
  },
  seatStatus:{
    type:Boolean
  }
})
//USER
const userSchema = new mongoose.Schema({
  email:{
    type:String,
    require:true,
    lowercase:true,
    unique:true,
  },
  password:{
    type:String,
    require:true,
  },
  admin:{
    type:Boolean,
    default:false,
  }
},{timestamps:true}
)
userSchema.pre('save',async function(next){
  try{
    const salt = await bcrpyt.genSalt(10);
    const hashPassword = await bcrpyt.hash(this.password , salt)
    this.password = hashPassword
    next()
  }
  catch(err){
    next(err)
  }
})
userSchema.methods.isValidPassword = async function(password){
  try{
    return await bcrpyt.compare(password, this.password)
  }
  catch(err){
    throw err
  }
}
let Movie = mongoose.model("Movie", movieShema);
let Schedule = mongoose.model("Schedule", scheduleChema);
let Room = mongoose.model("Room", roomSchema);
let Cinema = mongoose.model("Cinema", cinemaSchema);
let Seat = mongoose.model("Seat", seatSchema);
let User = mongoose.model("User", userSchema);

module.exports = {Movie,Schedule,Room,Cinema,Seat,User};
