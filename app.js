import express from 'express';
import  { userrouter } from './src/routes/user/index.js';
import cors from "cors"
import cookieParser from "cookie-parser"


const app=express();
app.use(cors())
app.use(cookieParser())
app.use("/DevCampus/v1/user",userrouter)
// app.use("/zapier/v2/Zap",zapRouter)

app.listen(3000)