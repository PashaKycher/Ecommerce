const express = require('express');
const router = express.Router();
const userSingUpController = require('../controller/user/userSingUp');
const userSingInController = require('../controller/user/userSingIn');
const userDetailsController = require('../controller/user/userDetails');
const userLogoutController = require('../controller/user/userLogout');
const authToken = require('../middleware/authToken');
const allUsersController = require('../controller/user/allUsers');
const updateUserController = require('../controller/user/updateUser');
const uploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProductOneController = require('../controller/product/getCategoryProductOne');
const getCategoryWiseProductController = require('../controller/product/getCategoryWiseProduct');
const getProductDetailsController = require('../controller/product/getProductDitails');
const addToCartController = require('../controller/user/addToCart');
const countAddToCartProductController = require('../controller/user/countAddToCartProduct');
const addToCartViewController = require('../controller/user/addToCartView');
const updateAddToCartController = require('../controller/user/updateAddToCart');
const deleteAddToCartController = require('../controller/user/deleteAddToCart');
const searchProductController = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');
const paymentController = require('../controller/order/payment');
const webhooksController = require('../controller/order/webhooks');
const orderController = require('../controller/order/order');

// routes for all user
router.post('/singup', userSingUpController)
router.post('/singin', userSingInController)
router.get('/user-details',authToken, userDetailsController)
router.get('/user-logout', userLogoutController)
router.post('/add-to-cart', authToken, addToCartController)
router.get('/count-product', authToken, countAddToCartProductController)
router.get('/all-cart-product', authToken, addToCartViewController)

// routes for admin
router.get('/all-users',authToken ,allUsersController)
router.post('/update-user', authToken, updateUserController)

// routes for products
router.post('/upload-product',authToken, uploadProductController)
router.get('/all-product', getProductController)
router.post('/update-product', authToken, updateProductController)
router.get('/get-cotegory-product', getCategoryProductOneController)
router.post('/category-product', getCategoryWiseProductController)
router.post('/product-details', getProductDetailsController)
router.post('/update-product-add', authToken, updateAddToCartController)
router.post('/delete-product', authToken, deleteAddToCartController)
router.get('/search-product', searchProductController)
router.post('/filter-product', filterProductController)

// payment and order routes
router.post('/checkout', authToken, paymentController)
router.post('/webhook', webhooksController) // /api/webhook
router.get('/order-list', authToken, orderController)


module.exports = router