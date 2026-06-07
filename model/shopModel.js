const mongoose = require("mongoose")

const shopSchema = new mongoose.Schema({

    shopName:{
        type:String,
        required:true
    },

    ownerName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    phone:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    area:{
        type:String,
        required:true
    },

    services:{
        type:Array,
        default:[]
    },

    status:{
        type:String,
        default:"pending",
        enum:["pending","approved","rejected"]
    }

},{
    timestamps:true
})

const shops = mongoose.model("shops",shopSchema)

module.exports = shops