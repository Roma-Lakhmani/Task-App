const express=require('express');
const router=new express.Router();
const User=require('../model/user');
router.post('/users',(req,res)=>{
    console.log('User',req.body);
    const user=new User(req.body);
    user.save().then(()=>{
        console.log('User successfully created!');
        res.status(201).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})

router.get('/users',(req,res)=>{
    User.find({}).then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.status(500).send();
    })
})
router.get('/users/:id',(req,res)=>{
    const _id=req.params.id;
    User.findById(_id).then((user)=>{
        if(!user){
           return  res.status(404).send();
        }
        res.send(user);
    }).catch(()=>{
        res.status(500).send();
    })    
});
router.patch('/users/:id',async function(req,res){
        const updates=Object.keys(req.body);
        const allowedupdates=['name','email','password','age'];
        const isvalidoperation=updates.every((update)=>{
            return allowedupdates.includes(update);
        })
        if(!isvalidoperation){
            return res.status(400).send({error:'Invalid updates!'})
        }
    try{
        const user=await User.findById(req.params.id)
        updates.forEach((update)=> user[update] = req.body[update]) 
        await user.save;
        // const user= await User.findByIdAndUpdate(req.params.id,req.body,{new :true, runValidators:true});
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch(e){
        res.status(400).send();
    }
})
router.delete('/users/:id',async function(req,res){
    try{
        const user= await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }catch(e){
        res.status(500).send();
    }
})
router.post('/users/login',async function(req,res){
    try{
        console.log('req.body-----',req.body);
        const user= await User.findByCredentials(req.body.email,req,body.password);
        console.log('User------',user);
        
        res.send(user);
    }catch(e){
        res.status(400).send();
    }
})
module.exports=router;