const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const allowedOrigins = ["http://localhost:5173" , "https://file-handling-tau.vercel.app"];
const cookieParser = require("cookie-parser");
const corsOption = {
    origin:function(origin , callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null , true);
        }
        else{
            console.log("blocked by origin: " , origin)
        }
    },
    credentials:true,
    optionsSuccessStatus: 200
};

//configuration
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("static"));
app.use(cors(corsOption));
app.use(helmet());
app.use(cookieParser());

//global error
const globalErrorHandler = require("./utils/globalError");

//file router
const fileRouter = require("./routes/file.route");
app.use("/api/v1/file" , fileRouter);

//user router
const userRouter = require("./routes/user.routes");
app.use("/api/v1/user" , userRouter);

app.use(globalErrorHandler);

module.exports = app;