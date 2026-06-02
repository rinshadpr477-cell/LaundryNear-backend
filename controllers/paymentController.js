const orders = require("../model/orderModel")
const Razorpay = require("razorpay")
const crypto = require("crypto")

console.log("KEY:", process.env.RAZORPAY_KEY_ID)
console.log("SECRET:", process.env.RAZORPAY_SECRET)

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
})

exports.createOrderController = async (req, res) => {
    console.log(" inside createorderConroller");

    try {

        const { amount, orderId } = req.body

        if (!orderId || !amount) {
            return res.status(400).json({
                message: "orderId or amount missing"
            })
        }

        const options = {
            amount: Number(amount) * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        }

        const razorpayOrder = await razorpay.orders.create(options)

        const updated = await orders.findByIdAndUpdate(
            orderId,
            {
                "paymentDetails.razorpayOrderId": razorpayOrder.id,
                status: "Pending Payment"
            },
            { returnDocument: "after" }
        )

        if (!updated) {
            return res.status(404).json({ message: "Order not found" })
        }

        return res.status(200).json({
            razorpayOrder,
            key: process.env.RAZORPAY_KEY_ID
        })

    } catch (err) {
        console.log(" PAYMENT ERROR:", err)
        return res.status(500).json({
            message: "Payment create order failed",
            error: err.message
        })
    }
}



exports.verifyPaymentController = async (req, res) => {
    console.log("inside verifyPAymentController");

    try {

        const {
            orderId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body

        const body =
            razorpay_order_id + "|" + razorpay_payment_id

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body)
            .digest("hex")

        const isAuthentic = expectedSignature === razorpay_signature

        if (isAuthentic) {

            await orders.findByIdAndUpdate(orderId, {
                status: "Paid",
                "paymentDetails.razorpayPaymentId": razorpay_payment_id,
                "paymentDetails.paymentStatus": "Paid"
            })

            return res.json({ success: true })
        }

        await orders.findByIdAndUpdate(orderId, {
            "paymentDetails.paymentStatus": "Failed",
            status: "Payment Failed"
        })

        res.status(400).json({ success: false })

    } catch (err) {
        res.status(500).json(err)
    }
}