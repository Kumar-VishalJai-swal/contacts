const express = require("express");

const User = require("../models/userModel");
const { loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.get("/register", async (req, res) => {
    res.render("register.ejs");
});

router.post("/contacts", (async  (req, res) => {
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
    console.log("hashed password" , hashedPassword);
    const user = new User({
        username,
        email,
        password: hashedPassword,
    })
    // const user = await User.save();
    await user.save();

    console.log(user);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
        
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.send("successfull");
    res.json({massage: "register the user.."});
})
);

router.get("/login", (req, res) => {
    res.send("login the user");
});
router.post("/login", loginUser);


router.get("/current", (req, res) => {
    res.send("current user");
});
router.get("/current", validateToken, currentUser);

module.exports = router;