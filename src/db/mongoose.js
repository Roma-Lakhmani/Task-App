const mongoose=require('mongoose');
// const validator=require('validator');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{useNewUrlParser:true,useCreateIndex:true});
// const User=mongoose.model('User',{
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid!');
//             }
//         }
//     },
//     age:{
//         type:Number,
//         default:0,
//         validate(value){
//             if(value<0){
//                 throw new Error('Age must be a positive number');
//             }
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         minlength:7,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error("Password cannot contain 'password'")
//             }
//         }
//     }
// })
// const me=new User({
//     name:'Roma',
//     email:'wsd@gmail.com',
//     age:13,
//     password:'aeszdgfgh'
// })

// me.save().then(()=>{
//     console.log('me',me);
// }).catch((err)=>{
//     console.log('err',err);
    
// })

// const task=mongoose.model('Tasks',
// {
//     description:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })
// const task1=new task({
//     description:' Angular2 ',
//     // completed:true
// })
// task1.save().then(()=>{
//     console.log(task1);    
// }).catch((err)=>{
//     console.log('errrrrr',err);

// })
