const express=require('express');
const router=new express.Router();
const User=require('../model/user');
const auth= require('../middleware/auth');
const multer=require('multer')
router.post('/users',async(req,res)=>{
    console.log('User',req.body);
    const user=new User(req.body);
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token});        
    }catch(e){
        res.status(400).send(e);
    }
    // user.save().then(()=>{
        // console.log('User successfully created!');
        // res.status(201).send(user);
    // }).catch((e)=>{
        // res.status(400).send(e);
    // })
})
router.get('/users/me',auth,async(req,res)=>{
   res.send(req.user);
})
// router.get('/users',auth,(req,res)=>{
//     User.find({}).then((users)=>{
//         res.send(users);
//     }).catch((e)=>{
//         res.status(500).send();
//     })
// })
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
// User can delete himself only not other users

// router.patch('/users/:id',async function(req,res){
//         const updates=Object.keys(req.body);
//         const allowedupdates=['name','email','password','age'];
//         const isvalidoperation=updates.every((update)=>{
//             return allowedupdates.includes(update);
//         })
//         if(!isvalidoperation){
//             return res.status(400).send({error:'Invalid updates!'})
//         }
//     try{
//         const user=await User.findById(req.params.id)
//         updates.forEach((update)=> user[update] = req.body[update]) 
//         await user.save;
//         // const user= await User.findByIdAndUpdate(req.params.id,req.body,{new :true, runValidators:true});
//         if(!user){
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch(e){
//         res.status(400).send();
//     }
// })
router.patch('/users/me',auth,async function(req,res){
    const updates=Object.keys(req.body);
    const allowedupdates=['name','email','password','age'];
    const isvalidoperation=updates.every((update)=>{
        return allowedupdates.includes(update);
    })
    if(!isvalidoperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try{
        updates.forEach((update)=> req.user[update] = req.body[update]) 
        console.log('updates',updates);
        
        await req.user.save();
        console.log('req.user.name',req.user.name);

        // const user= await User.findByIdAndUpdate(req.params.id,req.body,{new :true, runValidators:true});
        res.send(req.user);
    } catch(e){
        res.status(400).send();
    }
})
// router.delete('/users/:id',async function(req,res){
//     try{
//         const user= await User.findByIdAndDelete(req.params.id);
//         if(!user){
//             return res.status(404).send();
//         }
//         res.send(user);
//     }catch(e){
//         res.status(500).send();
//     }
// })

// User can delete himself only not other users
router.delete('/users/me',auth,async function(req,res){
    try{
        await req.user.remove();
        res.send(req.user);
    }catch(e){
        res.status(500).send();
    }
})
router.post('/users/login',async (req,res)=>{
    try{
        const user= await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        // res.send({user: user.getPublicProfile(),token});//sending an object in res.send express will JSON.stringify behind the scene
        console.log('token',token);
        
        res.send({user,token});
    }catch(e){
        res.status(400).send();
    }
})
router.post('/users/logout',auth,async (req,res)=>{    
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!=req.token; 
        }) //to check whether that token is authenticated token
        await req.user.save()
        res.send({message:'User logged out Successfully'})
    }catch(e){
        res.status(500).send()
    }
})
router.post('/users/logoutAll',auth,async (req,res)=>{
    try{
        req.user.tokens=[];
        console.log('req.user.tokens',req.user.tokens);
        await req.user.save()
        res.send({message:'User loggedout from all devices'})
    }catch(e){
        res.status(500).send();
    }
})
// -----------------upload file only of authenticated user-------------------
const upload = multer({
    dest: 'avatar',//foldername
    limits: {
        fileSize: 1000000
    },//filesize
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }//filetype

        cb(undefined, true)
    },
    storage: multer.memoryStorage()
})

router.post('/users/me/avatar', auth,upload.single('avatar'), async(req, res) => {
    console.log('req-------',req.file,req.file.buffer);
    
    req.user.avatar=req.file.buffer;
    await req.user.save();
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


router.delete('/users/me/avatar',auth, async(req, res) => {
    req.user.avatar=undefined;
    await req.user.save();
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
// ------------upload multiple----------------------

const upload1 = multer({
    dest: 'multiple',
})
router.post('/users/photos/upload', upload1.array('photos', 12), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


module.exports=router;