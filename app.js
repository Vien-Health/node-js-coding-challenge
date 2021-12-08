import express from "express";

const app = express();


//

//RUN SERVER ON PORT 8000
app.listen(process.env.PORT || 8000, ()=>{
    console.log(`App is running on port ${process.env.PORT || 8000}`);
})