const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/contacts-backend";

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(MONGO_URL);
        console.log("connect to DB", connect.connection.host, connect.connection.name);
        
    }
    catch(err)  {
        console.log(err);
      }
};
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const connectDB =  async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// module.exports = connectDB;
module.exports = connectDB