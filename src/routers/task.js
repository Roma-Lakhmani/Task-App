const express=require('express');
const router=new express.Router();
const Task=require('../model/task');
const auth=require('../middleware/auth')

// router.post('/tasks',async(req,res)=>{
    // const task1=new Task(req.body);
    // task1.save().then(()=>{
    //     res.status(201).send(task1);
    // }).catch((err)=>{
    //     res.status(400).send(e);
    // })
// })

//middleware us added to indicate that task is created by authenticated user
router.post('/tasks',auth,async(req,res)=>{
    
    const task1=new Task({...req.body,
    owner:req.user._id});
    try{
        await task1.save()
        res.status(201).send(task1);
    }catch(e){
        res.status(400).send(e);
    }
})
// router.get('/tasks',(req,res)=>{
//     Task.find({}).then((tasks)=>{
//         res.send(tasks);
//     }).catch((e)=>{
//         res.status(500).send();
//     })
// })

// --------------Return tasks only for the authenticated user------------------

// router.get('/tasks',auth,async(req,res)=>{
    // try{
        // const tasks= await Task.find({'owner':req.user._id});
        // res.send(tasks);
        // ------------OR-----------------
        // await req.user.populate('tasks').execPopulate()
        // res.send(req.user.tasks);
        // console.log('tasks',tasks);
        
    // }catch(e){
        // res.status(500).send();
    // }
// })

// ----------------//GET /tasks?completed=true--------------
// ----------------//GET/tasks?limit=10&skip=20---------
// ----------------//GET/tasks?sortBy=createdAt:asc---------

router.get('/tasks',auth,async(req,res)=>{
    try{
        const match={};
        const sort={};

        if(req.query.completed){
            match.completed=req.query.completed==='true'
        }

        if(req.query.sortBy){
            const parts=req.query.sortBy.split(':');
            console.log('parts',parts);
            
            sort[parts[0]]=(parts[1]==='desc') ? -1 : 1 //1 for asc and -1 for desc
            console.log('sort',sort);
        }
               
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),//req.query.limit is string
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks);
        // console.log('tasks',tasks);
        
    }catch(e){
        res.status(500).send();
    }
})

// ---------------fetch particular task---------------------

// router.get('/tasks/:id',(req,res)=>{
//     const _id=req.params.id;
//     Task.findById(_id).then((task)=>{
//         if(!task){
//            return  res.status(404).send();
//         }
//         res.send(task);
//     }).catch(()=>{
//         res.status(500).send();
//     })    
// });

// ---fetch particular task of login user--------------

router.get('/tasks/:id',auth, async (req,res)=>{
    const _id=req.params.id; 
    console.log('id--',_id);    
    try{
        const task=await Task.findOne({_id,'owner':req.user._id})
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send();
    }
});
// router.patch('/tasks/:id',async function(req,res){
//     const updates=Object.keys(req.body);
//     const allowedupdates=['description','completed'];
//     const isvalidoperation=updates.every((update)=>{
//         return allowedupdates.includes(update);
//     })
//     console.log('tasks',updates);
    
//     if(!isvalidoperation){
//         return res.status(400).send({error:'Invalid updates!'})
//     }
//     try{
//         const task=await Task.findById(req.params.id)
//         updates.forEach((update)=> task[update] = req.body[update]) 
//         await task.save;
//         // const task= await Task.findByIdAndUpdate(req.params.id,req.body,{new :true,                           runValidators:true});
//         if(!task){
//             return res.status(404).send();
//         }
//         res.send(task);
//     } catch(e){
//         res.status(400).send();
//     }
// })

// ----------Update particular task of authenticated user------------
router.patch('/tasks/:id',auth,async function(req,res){
    const updates=Object.keys(req.body);
    const allowedupdates=['description','completed'];
    const isvalidoperation=updates.every((update)=>{
        return allowedupdates.includes(update);
    })    
    if(!isvalidoperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try{
        const task = await Task.findOne({'_id':req.params.id,'owner':req.user._id})        
        if(!task){
            console.log('task-----',task);
            return res.status(404).send();
        }
        updates.forEach((update)=> task[update] = req.body[update]) 
        await task.save();
        // const task= await Task.findByIdAndUpdate(req.params.id,req.body,{new :true, runValidators:true});
        res.send(task);
    } catch(e){
        res.status(400).send();
    }
})

// router.delete('/tasks/:id',async function(req,res){
//     try{
//         const task= await Task.findByIdAndDelete(req.params.id);
//         if(!task){
//             return res.status(404).send();
//         }
//         res.send(task);
//     }catch(e){
//         res.status(500).send();
//     }
// })

// -----------------authenticated user can delete it own task only--------

router.delete('/tasks/:id',auth,async function(req,res){
    try{
        const task= await Task.findOneAndDelete({'_id':req.params.id, 'owner':req.user._id});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send();
    }
})
module.exports=router;