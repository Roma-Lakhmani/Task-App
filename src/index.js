const express = require('express');
require('./db/mongoose');

const userRouter =require('./routers/user')
const taskRouter =require('./routers/task')

const app=express();
const port=process.env.port || 3000;
app.use(express.json())
const router= new express.Router();
// app.use(router); // to register express router with our app
app.use(userRouter)
app.use(taskRouter)

// router.get('/test',(req,res)=>{
//     res.send('This is from my other router!');
// })
const bcrypt= require('bcryptjs')

const  myFunction=async ()=>{
    const password="Red12234";
    const hashedpassword= await bcrypt.hash(password,8);
    console.log(password);
    console.log(hashedpassword);
    const isMatch=await bcrypt.compare(password,hashedpassword);
    console.log(isMatch);
    
}
myFunction();
app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
    
})