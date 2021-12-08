import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
//import User from "./modules/user";


const app = express();


//INITIALIZE MIDDLEWARES
app.use(cors);
app.use(bodyParser);
if(process.env.NODE_ENV === "development"){
    app.use((req, res ,next)=>{
        console.info("=====================START=======================");

        const requestObject = {
            ENDPOINT: `${req.get("HOST")}${req.originalUrl}`,
            METHOD: req.method,
            AUTH_TOKEN: req.headers.authorization,
            BODY: req.body,
            QUERY: req.query,
            PARAMS: req.params,
        }

        console.info(requestObject);
        console.info("======================END=========================");
    });
}

//INITIALIZE ROUTE MIDDLEWARE
const prefix = "/api";
//app.use(prefix, User);

app.use((err, req, res,next)=>{
    if(!err){
        return next();
    }
    res.status(err.httpStatusCode || 500).json({success:false, "message":err});
});

app.use((req,res)=>{
    res.status(400).json({
        success:false,
        message: `Requested route [ ${req.get("HOST")}${req.originalUrl} ] not found`,
    });
});

//RUN SERVER ON PORT 8000
app.listen(process.env.PORT || 8000, ()=>{
    console.log(`App is running on port ${process.env.PORT || 8000}`);
});