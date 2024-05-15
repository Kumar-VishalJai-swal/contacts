const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const getRegisterUser = asyncHandler(async (req, res) => {
    res.render("register.ejs");
});

const registerUser = asyncHandler(async  (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("user already registered..");
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashes password" , hashedPassword);
    const user = await User.save({
        username,
        email,
        password: hashedPassword,
    });

    console.log(user);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
        
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }

    res.json({massage: "register the user.."});
    
});

const loginUser = asyncHandler(async   (req, res) => {
    const { email, password } = req.body;
    if(!email || ! password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username : user.username,
                email: user.email,
                id: user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
        );
        res.status(200).json({accessToken});
        
    }
    else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }
    

});

const currentUser = asyncHandler(async   (req, res) => {
    res.json(req.user);
    res.send({massage: "current user"});

});


module.exports = { getRegisterUser, registerUser, loginUser, currentUser };
