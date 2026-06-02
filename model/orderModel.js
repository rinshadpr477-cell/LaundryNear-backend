const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true
  },
  shopId: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },

  paymentDetails: {
    razorpayOrderId: {
      type: String,
      default: ""
    },

    razorpayPaymentId: {
      type: String,
      default: ""
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    }
  },

  status: {
    type: String,
    enum: [
      "Pending Payment",
      "Paid",
      "Accepted",
      "Picked Up",
      "Processing",
      "Ready",
      "Out For Delivery",
      "Delivered",
      "Cancelled"
    ],
    default: "Pending Payment"
  }

}, { timestamps: true })

const orders = mongoose.model("orders", orderSchema)

module.exports = orders