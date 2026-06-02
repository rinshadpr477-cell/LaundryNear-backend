const mongoose = require('mongoose')

const deliverySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    vehicleNumber:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    availability:{
        type:Boolean,
        default:true
    },
    userId:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const deliveryAgents = mongoose.model("deliveryAgents",deliverySchema)

module.exports = deliveryAgents