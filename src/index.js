const express = require('express');
require('./db/mongoose');
const jwt=require('jsonwebtoken');
const userRouter =require('./routers/user')
const taskRouter =require('./routers/task')

const app=express();
const port=process.env.port || 3000;
//middleware
// app.use((req,res,next)=>{
//     console.log(req.body,req.path);
//     if(req.method === 'GET'){
//         res.send('GET requests are disabled');
//     }else{
//         next();
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send('Site is under maintenance.Check back soon');
// })

app.use(express.json())
const router= new express.Router();
// app.use(router); // to register express router with our app
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
    
})

// router.get('/test',(req,res)=>{
//     res.send('This is from my other router!');
// })
// const bcrypt= require('bcryptjs')

// const  myFunction=async ()=>{
//     const password="Red12234";
//     const hashedpassword= await bcrypt.hash(password,8);
//     console.log(password);
//     console.log(hashedpassword);
//     const isMatch=await bcrypt.compare(password,hashedpassword);
//     console.log(isMatch);
    
// }
// const jwt = require('jsonwebtoken');
// const myFunction=async()=>{
//     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2VkMGFiNWYyMGFkOTNlYjViOTk5ZTQiLCJpYXQiOjE1NTkwNDIyMTAsImV4cCI6MTU1OTY0NzAxMH0.8lfSLQTDOYipOP36nIkyWHkJlx1lrOUWv7ocsfTYqRk'
//     console.log('token-----',token);
//     const data=jwt.verify(token,'thisismytoken');
//     console.log(data);
    
// }
// myFunction();