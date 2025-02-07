const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv/config');
const connectDB = require('./config/mongodb.js');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

(async () => {
    try{
        await connectDB(); 
    } catch (error) {
        console.log('Error connecting to the database');
    }
});


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});