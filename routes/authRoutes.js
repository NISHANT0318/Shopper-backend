const express = require ('express')
const router = express.Router()
const cors = require('cors')
const {test,registerUser,loginUser,getProfile,logoutUser} = require('../controllers/authcontrolllers')

//middle ware 

router.use(
    cors({
        credentials:true,
        origin: 'http://localhost:3000'
    })
)

router.get('/',test)
router.post('/signup',registerUser)
router.post('/login',loginUser)
router.get('/profile',getProfile)
router.post('/logout',logoutUser)



module.exports=router