
const express = require('express')
const router = express.Router()
const  cors = require('cors')

const{addToCart,getCart,removeFromCart} = require('../controllers/cartControllers')


router.use(
    cors({
        credentials:true,
        origin:'http://localhost:3000'
    })
)

router.post('/cart',addToCart)

router.get('/cart',getCart)

router.delete('/cart/:productId', removeFromCart);

module.exports=router