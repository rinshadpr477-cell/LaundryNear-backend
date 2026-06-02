const users = require('../model/userModel')
const bcrypt = require('bcryptjs')

exports.updateCustomerProfileController = async(req,res)=>{
  const userId = req.payload
  const {name,phone,address} = req.body
  const profile = req.file ? req.file.filename : req.body.profile

  try{
    const existingUser = await users.findById(userId)

    if(!existingUser){
      return res.status(404).json("User not found")
    }

    existingUser.name = name || existingUser.name
    existingUser.phone = phone || existingUser.phone
    existingUser.address = address || existingUser.address
    existingUser.profile = profile || existingUser.profile

    await existingUser.save()

    res.status(200).json(existingUser)

  }catch(err){
    res.status(500).json(err)
  }
}

exports.updateCustomerPasswordController = async(req,res)=>{
  const userId = req.payload
  const {oldPassword,newPassword} = req.body

  try{
    const existingUser = await users.findById(userId)

    if(!existingUser){
      return res.status(404).json("User not found")
    }

    const isMatch = await bcrypt.compare(oldPassword,existingUser.password)

    if(!isMatch){
      return res.status(406).json("Old password is incorrect")
    }

    existingUser.password = await bcrypt.hash(newPassword,10)

    await existingUser.save()

    res.status(200).json("Password updated successfully")

  }catch(err){
    res.status(500).json(err)
  }
}