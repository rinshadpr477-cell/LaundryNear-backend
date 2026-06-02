const shops = require("../model/shopModel")

// Add Shop

exports.addShopController = async(req,res)=>{

    console.log("inside addShopController")

    const {shopName,ownerName, email,phone, address, area,services } = req.body

    try{

        const existingShop = await shops.findOne({email})

        if(existingShop){
            res.status(406).json("Shop already exists")
        }
        else{

            const newShop = new shops({ shopName, ownerName, email, phone,address,  area,  services })

            await newShop.save()

            res.status(200).json(newShop)
        }

    }catch(err){
        res.status(500).json(err)
    }
}



// Get All Shops

exports.getAllShopsController = async(req,res)=>{

    try{

        const allShops = await shops.find()

        res.status(200).json(allShops)

    }catch(err){
        res.status(500).json(err)
    }
}



// Get Single Shop

exports.getSingleShopController = async(req,res)=>{

    const {id} = req.params

    try{

        const shopDetails = await shops.findById(id)

        res.status(200).json(shopDetails)

    }catch(err){
        res.status(500).json(err)
    }
}