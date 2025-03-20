const stripe = require('../../config/stripe')
const addToCartModel = require('../../models/cartProduct')
const orderModel = require('../../models/orderProductModel')
// get endpoint secret from documentation stripe
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY

// create array of products from stripe
async function getLineItems(lineItems) {
    // create array
    let productItems = []
    // check if lineItems exist
    if (lineItems?.data?.length) {
        // loop through lineItems
        for (const item of lineItems.data) {
            // get product
            const product = await stripe.products.retrieve(item.price.product)
            // get product id
            const productId = product.metadata.productId
            // create product data
            const productData = {
                productId: productId,
                name: product.name,
                price: item.price.unit_amount / 100,
                quantity: item.quantity,
                image: product.images,
            }
            // push to array
            productItems.push(productData)
        }
    }
    // return array
    return productItems
}
// create controller
const webhooksController = async (req, res) => {
    // create payload
    const payloadString = JSON.stringify(req.body)
    // header from documentation
    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret
    })
    // create event
    let event
    try {
        // set event from documentation
        event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret)
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
    switch (event.type) {
        case 'checkout.session.completed':
            // create session from event
            const session = event.data.object;
            // get line items
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
            // get product details
            const productDetails = await getLineItems(lineItems)
            // get order details
            const orderDitails = {
                productDitails: productDetails,
                email: session.customer_email,
                userId: session.metadata.userId,
                paymentDetails:{
                    paymentId: session.payment_intent,
                    payment_method_type: session.payment_method_types,
                    payment_status: session.payment_status,
                },
                shipping_options: session.shipping_options.map(item =>{
                    return {
                        ...item,
                        shipping_amount: item.shipping_amount / 100
                    }
                }),
                totalAmount: session.amount_total / 100,
            }
            // create order
            const order = new orderModel(orderDitails)
            // save order
            const saveOrder = await order.save()
            // remove product from cart
            if (saveOrder?._id) {
                const deleteCart = await addToCartModel.deleteMany({ userId: session.metadata.userId })
            }
            break;
        case 'payment_intent.succeeded':
            console.log('Seccessful payment', event.data.object);
            break;
        case 'charge.succeeded':
            console.log('Seccessful charge', event.data.object);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send();
}

module.exports = webhooksController