const dns = require("dns")
dns.setServers(["8.8.8.8"])
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./Routes/router')
require('./db/dbConnection')

// create server
const server=express()

// use cors in server
server.use(cors())

// use json parser in server(middleware) to convert data    
server.use(express.json()) 

server.use(router)
server.use('/uploads',express.static('./uploads'))


// setting port
const PORT=process.env.PORT || 4000

// run the server
server.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
})

server.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">server running and waiting for client request</h1>`)
})