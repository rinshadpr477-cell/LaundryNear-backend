const express = require("express")
const userController = require("../controllers/userController")
const jwtMiddleware = require("../middleware/jwtMiddleware")
const shopController = require("../controllers/shopController")
const orderController = require("../controllers/orderController")
const adminController = require("../controllers/adminController")
const customerController = require("../controllers/customerController")
const multerMiddleware = require("../middleware/multerMiddleware")
const paymentController = require("../controllers/paymentController")

const router = new express.Router()

// register & login

router.post("/register", userController.registerController)
router.post("/login", userController.loginController)
router.post("/google-login",userController.googleLoginController)

// add, allshops , view shops

router.post("/add-shop",shopController.addShopController)
router.get("/all-shops",shopController.getAllShopsController)
router.get("/view-shop/:id",shopController.getSingleShopController)

// -------orders------

router.post('/place-order', jwtMiddleware, orderController.placeOrderController)
router.get('/customer-orders', jwtMiddleware, orderController.getCustomerOrdersController)
router.get('/view-order/:id',jwtMiddleware,orderController.getSingleOrderController)
router.get('/shop/orders',jwtMiddleware,orderController.getShopOrdersController)
router.put("/shop/order/accept/:id", jwtMiddleware,orderController.acceptOrderController)
router.put("/shop/order/status/:id", jwtMiddleware,orderController.updateOrderStatusController)
router.put("/order/cancel/:id",jwtMiddleware,orderController.cancelOrderController)

// --------------admin routes-----------------

router.get("/admin/users", jwtMiddleware, adminController.getAllUsersController)
router.get("/admin/orders", jwtMiddleware, adminController.getAllOrdersController)
router.get("/admin/dashboard-count", jwtMiddleware, adminController.getDashboardCountController)


// -----------------delivery routes--------

router.get("/delivery/orders",jwtMiddleware,orderController.getDeliveryOrdersController)
router.put("/delivery/order/pickup/:id",jwtMiddleware,orderController.pickupOrderController)
router.put("/delivery/order/deliver/:id",jwtMiddleware,orderController.deliverOrderController)

//----customerprofile -----

router.put('/customer/profile-update', jwtMiddleware, multerMiddleware.single('profile'),customerController.updateCustomerProfileController)
router.put('/customer/change-password',jwtMiddleware,customerController.updateCustomerPasswordController)

// payment 

router.post("/payment/create-order",jwtMiddleware,paymentController.createOrderController)
router.post("/payment/verify",jwtMiddleware,paymentController.verifyPaymentController)




module.exports = router