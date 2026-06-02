const users = require('../model/userModel')
const shops = require('../model/shopModel')
const orders = require('../model/orderModel')

// get all users

exports.getAllUsersController = async (req, res) => {
    console.log("inside getAllUsersController");

    try {
        const allUsers = await users.find()
        res.status(200).json(allUsers)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// get all orders

exports.getAllOrdersController = async (req, res) => {
    console.log("inside getAllOrdersController");

    try {
        const allOrders = await orders.find().sort({ _id: -1 })
        res.status(200).json(allOrders)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// get dashboard count

exports.getDashboardCountController = async (req, res) => {
    console.log("inside getDashboardCountController");

    try {
        const totalUsers = await users.countDocuments()
        const totalShops = await shops.countDocuments()
        const totalOrders = await orders.countDocuments()
        const deliveredOrders = await orders.countDocuments({ status: "Delivered" })

        const allOrders = await orders.find()

        const revenue = allOrders.reduce(
            (total, item) => total + Number(item.amount || 0),
            0
        )

        res.status(200).json({ totalUsers, totalShops,  totalOrders, deliveredOrders, revenue })
    }
    catch (err) {
        res.status(500).json(err)
    }
}