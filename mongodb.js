// const mongodb=require('mongodb');
// const MongoClient=mongodb.MongoClient;
// const ObjectId=mongodb.ObjectId;

const {MongoClient,ObjectId}=require('mongodb');
const connectionurl="mongodb://127.0.0.1:27017";
const databasename="task-manager";
MongoClient.connect(connectionurl,{urlnewparser:true},(error,client)=>{
    if(error){
        return console.log('error');
    }
    console.log('Connection Successfully!');
    const db=client.db(databasename);

//Insert one document

   /* db.collection('users').insertOne({
        name:'Roma',
        age:23
    },(err,result)=>{   
        if(err){
            return console.log('User not inserted!');
        }
        console.log(result.ops);
    })*/
//Insert Many

   /* db.collection('users').insertMany([{
        name:'Sapna',
        age:23
    },{
        name:'Jen',
        age:24
    },{
        name:'Ankita',
        age:22
    }],(err,result)=>{   
        if(err){
            return console.log('User not inserted!');
        }
        console.log(result.ops);
    })*/
    // db.collection('tasks').insertMany([{
    //     description:'Angular 1',
    //     completed:true
    // },{
    //     description:'Angular 2',
    //     completed:false
    // },{
    //     description:'Angular 3',

    //     completed:false
    // }],(err,result)=>{   
    //     if(err){
    //         return console.log('Description not inserted!');
    //     }
    //     console.log(result.ops);
    // })
//Query document
    // db.collection('users').findOne({"_id":ObjectId("5ce5146640168457de7e9a87")},(err,user)=>{
    //     if(err){
    //         return console.log('Unable to fetch!');
    //     }
    //     console.log(user);
        
    // })
    // db.collection('users').find({age:23}).toArray((err,user)=>{
    //     console.log('user',user);
    // })
    // db.collection('users').find({age:23}).count((err,count)=>{
    //     console.log('count',count);
    // })
    // db.collection('users').findOne({"_id":ObjectId("5ce51f8f25261e5beb10f44c")},(err,user)=>{
    //     if(err){
    //         return console.log('Unable to fetch!');
    //     }
    //     console.log('user------',user);
        
    // })
    // db.collection('tasks').find({completed:false}).toArray((err,count)=>{
    //     console.log('coungt',count);
    // })
// Update Documents
    // db.collection('users').updateOne({
    //     _id:new ObjectId("5ce5146640168457de7e9a87")
    // },{
    //     // $set:{
    //     //     name:'Ram'
    //     // }
    //     $inc:{
    //         age:1
    //     }
    // }).then((result)=>{
    //     console.log('result',result);
    // })
    // .catch((error)=>{
    //     console.log('error',error);
    // })
    // db.collection('tasks').updateMany({
    //   completed:false
    // },{
    //     // $set:{
    //     //     name:'Ram'
    //     // }
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=>{
    //     console.log('result.modifiedCount:',result.modifiedCount);
    // })
    // .catch((error)=>{
    //     console.log('error',error);
    // })

//Delete documents
// db.collection('users').deleteMany({
//        age:22
//     }).then((result)=>{
//         console.log('result',result);
//     })
//     .catch((error)=>{
//         console.log('error',error);
//     })
// db.collection('tasks').deleteOne({
//        description:'Angular 3'
//     }).then((result)=>{
//         console.log('result',result);
//     })
//     .catch((error)=>{
//         console.log('error',error);
//     })
})