const User = require('../models/user')
const {hashPassword,comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req,res) =>{
    res.json("Test is working")
}
//register user endpoint
const registerUser= async (req,res)=>{

    try {
        const {name,email,password} = req.body
        //Check if name was entered
        if(!name){
            return res.json({
                error:'name is required'
            })
        }
        if(!password || password.length<6){
            return res.json({
                error:"password is require and should be more than 6 character"
            })
        }

        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error:"Email is taken"
            })
        }

        //create user in database 
        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            name,email,password:hashedPassword
        })

        return res.json(user)
        
    } catch (error) {

        console.log(error)
        
    }

}
//login user endpoint

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // If user exists 
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user exists'
            });
        }

        // Password match 
        const match = await comparePassword(password, user.password);
        if (match) {
            jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({ ...user._doc, token }); // Include token
            });
        } else {
            return res.json({
                error: "Password does not match"
            });
        }
    } catch (error) {
        console.log(error);
    }
};


const getProfile =  (req,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
            if(err) throw err;
            res.json(user)
        })
    }
    else{
        res.json(null)

    }
}

const logoutUser=(req,res)=>{
    res.clearCookie('token')
    res.json({message:"User logged out successfully"})
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}