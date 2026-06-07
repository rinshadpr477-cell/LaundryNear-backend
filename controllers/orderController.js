const orders = require('../model/orderModel')

// place order

exports.placeOrderController = async (req, res) => {
    console.log("inside placeOrderController");

    const { shopId, customerName, phone, address, serviceType, quantity, amount } = req.body
    const customerId = req.payload

    try {

        const newOrder = new orders({
            customerId,
            shopId,
            customerName,
            phone,
            address,
            serviceType,
            quantity,
            amount,
            paymentDetails: {
                paymentStatus: "Pending"
            },
            status: "Pending Payment"
        })

        await newOrder.save()
        res.status(200).json(newOrder)

    } catch (err) {
        res.status(500).json(err)
    }
}

// get customer orders

exports.getCustomerOrdersController = async (req, res) => {
    console.log("inside getCustomerOrdersController");

    const customerId = req.payload

    try {

        const customerOrders = await orders.find({ customerId }).sort({ _id: -1 })
        res.status(200).json(customerOrders)

    } catch (err) {
        res.status(500).json(err)
    }
}

// get single order

exports.getSingleOrderController = async (req, res) => {
    console.log("inside getSingleOrderController");

    const { id } = req.params

    try {

        const orderDetails = await orders.findById(id)

        if (orderDetails) {
            res.status(200).json(orderDetails)
        } else {
            res.status(404).json("Order not found")
        }

    } catch (err) {
        res.status(500).json(err)
    }
}

// get shop orders

exports.getShopOrdersController = async (req, res) => {
    console.log("inside getShopOrdersController");

    const shopId = req.payload;

    console.log("JWT Payload:", shopId);

    try {

        const shopOrders = await orders.find({ shopId });

        console.log("Orders Found:", shopOrders);

        res.status(200).json(shopOrders);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// accept order

exports.acceptOrderController = async (req, res) => {
    console.log("inside acceptordercontroller");

    const { id } = req.params

    try {
        const updatedOrder = await orders.findByIdAndUpdate(
            id, { status: "Accepted" }, { returnDocument: "after" }
        )

        if (updatedOrder) {
            res.status(200).json(updatedOrder)
        }
        else {
            res.status(404).json("Order not found")
        }

    }
    catch (err) {
        res.status(500).json(err)
    }

}

// update order status

exports.updateOrderStatusController = async (req, res) => {
    console.log("inside updateOrderStatusController");

    const { id } = req.params
    const { status } = req.body

    try {
        const updatedOrder = await orders.findByIdAndUpdate(
            id,
            { status }, { returnDocument: "after" }
        )
        if (updatedOrder) {
            res.status(200).json(updatedOrder)
        }
        else {
            res.status(404).json("order not found")
        }

    }
    catch (err) {
        res.status(500).json(err)

    }

}

// get delivery orders

exports.getDeliveryOrdersController = async (req, res) => {
    console.log("inside getDeliveryOrdersController");

    try {
        const deliveryOrders = await orders.find({
            status: { $in: ["Ready for Delivery", "Out for Delivery"] }
        }).sort({ _id: -1 })

        res.status(200).json(deliveryOrders)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// pickup order

exports.pickupOrderController = async (req, res) => {
    console.log("inside pickupOrderController");

    const { id } = req.params

    try {
        const updatedOrder = await orders.findByIdAndUpdate(
            id,
            { status: "Out for Delivery" },
            { returnDocument: "after" }
        )

        if (updatedOrder) {
            res.status(200).json(updatedOrder)
        }
        else {
            res.status(404).json("Order not found")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// deliver order

exports.deliverOrderController = async (req, res) => {
    console.log("inside deliverOrderController");

    const { id } = req.params

    try {
        const updatedOrder = await orders.findByIdAndUpdate(
            id,
            { status: "Delivered" },
            { returnDocument: "after" }
        )

        if (updatedOrder) {
            res.status(200).json(updatedOrder)
        }
        else {
            res.status(404).json("Order not found")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// cancel order


exports.cancelOrderController = async (req, res) => {

    try {

        const { id } = req.params

        const order = await orders.findById(id)

        if (!order) {
            return res.status(404).json("Order not found")
        }

        if (
            order.status === "Delivered" ||
            order.status === "Out For Delivery"
        ) {
            return res.status(400).json(
                "Cannot cancel order"
            )
        }

        order.status = "Cancelled"

        await order.save()

        res.status(200).json(order)

    }
    catch (err) {
        res.status(500).json(err)
    }

}
