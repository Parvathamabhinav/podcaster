const express=require("express");
const app = express();
const userApi=require("./routes/user");
const cookieParser = require("cookie-parser");
const CatApi=require("./routes/categories");
const podcastApi = require("./routes/podcast");
require("dotenv").config();
require("./conn/conn");
app.use(cookieParser());
app.use(express.json());

//all routes
app.use("/api/v1",userApi);
app.use("/api/v1",CatApi);
app.use("/api/v1",podcastApi);
app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});