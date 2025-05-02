import express, { Router } from "express";
import { signinSchema, signupSchema } from "../../../types/index.js";
import { db } from "../../../db/db.js";
import { userTable } from "../../../db/schema.js";
import { and, eq } from "drizzle-orm";
import { authhandler } from "../../middlewares/authHandler.js";
import jwt from "jsonwebtoken"
import dot from "dotenv";
dot.config()


const userRouter=Router()
userRouter.use(express.json())

userRouter.post("/signup",async(req,res)=>{
    const body=req.body;
    const parsedbody=signupSchema.safeParse(body);
    if(parsedbody.error){
          return res.status(400).json("you are sending wrong data")
    }
  
    const existsUser= await db.select().from(userTable).where(eq(userTable.username,parsedbody.data.username))

    if(existsUser.length>0){
        return res.status(403).json("user Already Exists")
    }
    else{
        await db.insert(userTable).values(parsedbody.data);
    }   

    return res.status(200).json("registered successfullyyyy")

})

userRouter.post("/signin",async(req,res)=>{
    
   const body=req.body
   console.log(body)
   const parsedbody=signinSchema.safeParse(body)
   if(parsedbody.error){
    return res.status(401).json("entered wrong data")
   }
  const userData= await db.select().from(userTable).where(and(eq(userTable.username,parsedbody.data.username),eq(userTable.password,parsedbody.data.password)))
    if(userData.length==0){
        return res.status(401).json("userCredential are worng")
    }
  
        const cookie=  jwt.sign({id:userData[0].username},"123")
       
        res.cookie("cookie",cookie)
        return res.status(200).json({
            message:"you are logedin",
           
        })
    
   

})

userRouter.get("/userdetails",authhandler,async(req,res)=>{
    
    try {
        const username=req.body.username
       const userdetails= await db.select().from(userTable).where(eq(userTable.username,username))
       if(userdetails.length==0){
        return res.status(403).json("something went wrong please login");
       }
       else{
        return res.status(200).json({...userdetails[0],password:""})
       }
    } catch (error) {
        return res.status(403).json(error)
    }

   
})

export const  userrouter=userRouter