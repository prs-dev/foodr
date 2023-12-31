const mongoose = require("mongoose")

const dbConnect = () => {
   return mongoose.connect(process.env.MONGO)
}

module.exports = {
    dbConnect
}