
// backend api
const backendDomin = process.env.REACT_APP_BACKEND_URL //"http://localhost:8080"
// api url
const SummaryApi = {
    singUP: {
        url: `${backendDomin}/api/singup`,
        method: "post"
    },
    singIn: {
        url: `${backendDomin}/api/singin`,
        method: "post"
    },
    currentUser: {
        url: `${backendDomin}/api/user-details`,
        method: "get"
    },
    logoutUser: {
        url: `${backendDomin}/api/user-logout`,
        method: "get"
    },
    allUser: {
        url: `${backendDomin}/api/all-users`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomin}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomin}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomin}/api/all-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomin}/api/update-product`,
        method: "post"
    },
    categoryProduct: {
        url: `${backendDomin}/api/get-cotegory-product`,
        method: "get"
    },
    getCategoryWiseProduct: {
        url: `${backendDomin}/api/category-product`,    
        method: "post"
    },
    productDetails: {
        url: `${backendDomin}/api/product-details`,
        method: "post"
    },
    addToCart: {
        url: `${backendDomin}/api/add-to-cart`,
        method: "post"
    },
    countProduct: {
        url: `${backendDomin}/api/count-product`,
        method: "get"
    },
    allProductCart: {
        url: `${backendDomin}/api/all-cart-product`,
        method: "get"
    },
    updateAddToCart: {
        url: `${backendDomin}/api/update-product-add`,
        method: "post"
    },
    deleteAddToCart: {
        url: `${backendDomin}/api/delete-product`,
        method: "post"
    },
    searchProduct: {
        url: `${backendDomin}/api/search-product`,
        method: "get"
    },
    filterProduct: {
        url: `${backendDomin}/api/filter-product`,
        method: "post"
    },
    payment: {
        url: `${backendDomin}/api/checkout`,
        method: "post"
    },
    getOrder:{
        url: `${backendDomin}/api/order-list`,
        method: "get"
    },
    allOrders: {
        url: `${backendDomin}/api/all-orders`,
        method: "get"
    }
}

export default SummaryApi