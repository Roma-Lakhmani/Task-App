// Without middleware -  new request- run route handler
//With middleware -new request -do something - run route handler
const jwt=require('jsonwebtoken');
const User=require('../model/user');
const auth=async(req,res,next)=>{
    // console.log('auth middleware');
    try{
        const token=  req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,'thisismytoken');
        const user=User.findOne({'_id':decoded._id,'tokens.token':token});
        // console.log('user',user);

        if(!user){
            throw new Error()
        }
        req.user=user;
        next();

        } catch(e){
            res.status(401).send('Please Authenticate!');
    }
}
module.exports=auth;