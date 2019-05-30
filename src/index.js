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

//----------concept of bcrypt------------

// const bcrypt= require('bcryptjs')

// const  myFunction=async ()=>{
//     const password="Red12234";
//     const hashedpassword= await bcrypt.hash(password,8);
//     console.log(password);
//     console.log(hashedpassword);
//     const isMatch=await bcrypt.compare(password,hashedpassword);
//     console.log(isMatch);
    
// }
//----------concept of jwt------------

// const jwt = require('jsonwebtoken');
// const myFunction=async()=>{
//     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2VkMGFiNWYyMGFkOTNlYjViOTk5ZTQiLCJpYXQiOjE1NTkwNDIyMTAsImV4cCI6MTU1OTY0NzAxMH0.8lfSLQTDOYipOP36nIkyWHkJlx1lrOUWv7ocsfTYqRk'
//     console.log('token-----',token);
//     const data=jwt.verify(token,'thisismytoken');
//     console.log(data);
    
// }
// myFunction();
//----------concept of toJSON------------
// const pet={
//     name:'Hal'
// }
// pet.toJSON=function(){
//     // console.log('this',this);
//     // return this;
//     return {};
// }
// console.log('After stringify',JSON.stringify(pet));

//----------concept of ref to a model to fetch its profile------------

// const Task=require('./model/task');
// const main =async ()=>{
//     const task =await Task.findById('5cee58cd1da7c92e1b4b3948');
//     await task.populate('owner').execPopulate();
//     console.log(task.owner);
    
// }

// const User=require('./model/user')
// const main =async ()=>{
//     const user =await User.findById('5cee5002388b6f2bebd04151')
//     console.log('usee',user);
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main();     
