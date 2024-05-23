const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

const {mongoose} = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database Connected"))
.catch((err)=>console.log("Database not connected",err))
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use('/auth',require('./routes/authRoutes'))

app.use('/api',require('./routes/cartRoutes'))

const port = 8000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})