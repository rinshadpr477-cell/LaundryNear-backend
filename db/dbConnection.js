const mongoose=require('mongoose')

const connection_string=process.env.CONNECTION_STRING

mongoose.connect(connection_string).then(res=>{
    console.log('mongoDb Connected');
}).catch(err=>{
    console.log("connection failed",err);
    
})