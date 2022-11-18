const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParseer = require("body-parser");
const cookieParser = require("cookie-parser"); 
// const morgan = require("morgan");
// const dotenv = require("dotenv");
const movieRoute = require("./routes/movie");
const scheduleRoute =   require("./routes/schedule")
const roomRoute = require("./routes/room")
const cinemaRoute = require("./routes/cinema")
const seatRoute = require("./routes/seat")
const userRoute = require("./routes/user")
const createError = require("http-errors")
const {verifyAccessToken} = require("./validation/jwt")
// dotenv.config();

app.use(cors({origin:"*"}));
//CONNECT DB
mongoose.connect("mongodb+srv://trieu123vn:trieu123@cluster0.w1tifv5.mongodb.net/Movie?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected DB")
}
)
.catch(()=>{
console.log("Somthing went wrong!")
})

app.use(bodyParseer.json({limit:"50mb"}))
// app.use(cors());
// app.use(morgan("common"));
app.use(cookieParser());
//ROUTE MOVIE
app.use("/v1/movie",movieRoute);
//ROUTE SCHEDULE
app.use("/v1/schedule",scheduleRoute);
//ROUTE ROOM
app.use("/v1/room" , roomRoute)
//ROUTE CINEMA
app.use("/v1/cinema",cinemaRoute);
//ROUTE SEAT
app.use("/v1/seat" , seatRoute)
//ROUTE USER
app.use("/v1/user", userRoute)
app.listen(8000, ()=>{
    console.log("Server is running")
})