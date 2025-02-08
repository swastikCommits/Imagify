const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv/config');
const connectDB = require('./config/mongodb.js');
const userRouter = require('./routes/userRoutes.js');


const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/user', userRouter);
// http://localhost:4000/api/user/register
// http://localhost:4000/api/user/login




app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

