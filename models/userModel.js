const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "User",
    // },
    username: {
        type: String,
        required: [true, "please add the username"]
    },
    email: {
        type: String,
        required: [true, "Please add Email "],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        require:[true, "please add the user password"]
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);