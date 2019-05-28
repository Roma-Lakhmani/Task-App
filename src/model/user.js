const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs'); 
// Create schema in order to take use middleware so as to execute something before or after an event;
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:'Please enter your name',
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!');
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number');
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Password cannot contain 'password'")
            }
        }
    }
});
userSchema.statics.findByCredentials=(email,password)=>{
    console.log('user----------',email,password);
}


// userSchema.statics.findByCredentials= async function(email,password){
//     
//     const user=await User.findOne({email});
    
//     if(!user){
//         throw new Error('Unable to login!')
//     }
//     const isMatched= await bcrypt.compare(password,user.password);

//     if(!isMatched){
//         throw new Error('Unable to login!');
//     }
//     return user;
// }
//Hash the plain text password before saving
userSchema.pre('save',async function(next){
    const user =this;
    // console.log('this',this);
    
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    console.log('Just before saving!');
    next();// to tell that task before saving is over otherwise it will be hanged here
})

const User = mongoose.model('User', userSchema)
module.exports=User;