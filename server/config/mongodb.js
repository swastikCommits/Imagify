const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`)
}

module.exports = { connectDB }; ;