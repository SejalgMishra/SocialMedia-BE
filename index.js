require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const authRoute = require("./server/routes/authRoute")
const userRoute = require("./server/routes/userRoute")
const postRoute = require("./server/routes/postRoute")
const cmntRoute = require("./server/routes/cmntRoute")
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieparser = require("cookie-parser");



const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
const app = express()
app.use(express.json());
app.use(cookieparser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors(corsOptions));
app.use('/api' , authRoute)
app.use('/api' , userRoute)
app.use('/api' , postRoute)
app.use('/api' , cmntRoute)




const connectDB = async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1/SociableX", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("database connected...");
    } catch (error) {
      console.log(error);
    }
  };
  connectDB();

app.listen(3004 , "localhost" , () => (
    console.log("server started on 3004")
))
