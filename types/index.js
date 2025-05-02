import {z,} from "zod"

export const signupSchema=z.object({
    username:z.string().min(5),
    name:z.string().min(5),
    password:z.string().min(6),

})
export const signinSchema=z.object({
    username:z.string().min(5),
   
    password:z.string().min(6),

})

export const zapSchema=z.object({
    
    triggerId:z.string().uuid(),
    actionList:z.array(z.string().uuid()),
   

})
export const actionIdschema=z.object({
    actionId:z.string().uuid()
})

