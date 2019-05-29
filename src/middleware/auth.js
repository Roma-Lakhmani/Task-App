// Without middleware -  new request- run route handler
//With middleware -new request -do something - run route handler
const jwt=require('jsonwebtoken');
const User=require('../model/user');
const auth=async(req,res,next)=>{
    // console.log('auth middleware');
    try{
        const token=  req.header('Authorization').replace('Bearer ','');
        console.log('token',token);
        const decoded = jwt.verify(token,'thisismytoken');
        console.log('decoded',decoded,decoded._id);
        const user=await User.findOne({'_id':decoded._id,'tokens.token':token});

        // console.log('user._id,user.tokens.token',user._id,user.tokens.token);
        if(!user){
            console.log('err---');
            
            throw new Error()
        }
        req.token=token;
        console.log('req.token',req.token);
        req.user=user;
        next();

        } catch(e){
            res.status(401).send('Please Authenticate!');
    }
}
module.exports=auth;