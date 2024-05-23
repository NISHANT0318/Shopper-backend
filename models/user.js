const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema ({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    cart: {
        type: Map, // A map to store product IDs and their quantities
        of: Number,
        default: {} // Default to an empty cart
      }
})

const UserModel = mongoose.model('User',userSchema)

module.exports= UserModel