const stripe = require('../../config/stripe')
const userModel = require('../../models/userModel')

const paymentController = async (req, res) => {
    try {
        // get user id from req midelware authToken
        const userId = req.userId
        // get user from db
        const user = await userModel.findById(userId)
        // get cart items from frontend
        const { cartItems } = req.body
        // params for checkout
        const params = {
            submit_type: "pay",
            mode: "payment",
            customer_creation: "always",
            // payment method, card or google pay or apple pay
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                {
                    // id of shipping rate
                    shipping_rate: "shr_1R3naOBa3hMGAL3nWuIcFIFC"
                }
            ],
            // email of customer
            customer_email: user.email,
            metadata: {
                // id of user
                userId : userId,
            },
            line_items: cartItems.map((item, index) => {
                return {
                    price_data: {
                        // name of money
                        currency: "uah",
                        // data of all product in cart
                        product_data: {
                            name: item.productId.productName,
                            images: item.productId.productImage,
                            metadata: {
                                productId: item.productId._id
                            }
                        },
                        // price of product multiply by 100
                        unit_amount: item.productId.selling * 100
                    },
                    // quantity of product defoult 1
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    // quantity of product
                    quantity: item.quantity
                }
            }),
            // if payment is success redirect to frontend
            success_url: `${process.env.FRONTEND_URL}/success`,
            // if payment is cancel redirect to frontend
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        }
        // create checkout session as in "https://docs.stripe.com/checkout/quickstart"
        const session = await stripe.checkout.sessions.create(params)
        // send checkout session to frontend
        return res.status(303).json({
            message: "Checkout session created successfully",
            data: session,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = paymentController