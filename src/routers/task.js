const express=require('express');
const router=new express.Router();
const Task=require('../model/task');
router.post('/tasks',(req,res)=>{
    const task1=new Task(req.body);
    task1.save().then(()=>{
        res.status(201).send(task1);
    }).catch((err)=>{
        res.status(400).send(e);
    })
})
router.get('/tasks',(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks);
    }).catch((e)=>{
        res.status(500).send();
    })
})
router.get('/tasks/:id',(req,res)=>{
    const _id=req.params.id;
    Task.findById(_id).then((task)=>{
        if(!task){
           return  res.status(404).send();
        }
        res.send(task);
    }).catch(()=>{
        res.status(500).send();
    })    
});
router.patch('/tasks/:id',async function(req,res){
    const updates=Object.keys(req.body);
    const allowedupdates=['description','completed'];
    const isvalidoperation=updates.every((update)=>{
        return allowedupdates.includes(update);
    })
    console.log('tasks',updates);
    
    if(!isvalidoperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try{
        const task=await Task.findById(req.params.id)
        updates.forEach((update)=> task[update] = req.body[update]) 
        await task.save;
        // const task= await Task.findByIdAndUpdate(req.params.id,req.body,{new :true, runValidators:true});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch(e){
        res.status(400).send();
    }
})
router.delete('/tasks/:id',async function(req,res){
    try{
        const task= await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send();
    }
})
module.exports=router;