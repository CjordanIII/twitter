
const mongoose = require('mongoose')

module.exports = function connectDB(){
    // connecting to monogodb
    mongoose.connect(process.env.MONGO_URI)
    // check for connection
    const db = mongoose.connection
    db.on('error',(e)=>{
        console.log(e)
    })
    db.on('open',()=>{
        console.log('Connected to MongoDB')
    })
    db.on('close',()=>{
        console.log("MongoDB disconnected")
    })
} 