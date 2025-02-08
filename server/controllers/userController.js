const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        
        if(!name || !email || !password){
            return res.status(411).json({ message: 'Missing Details' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token=jwt.sign({id: user._id}, process.env.JWT_SECRET);

        res.status(200).json({ token, user: { name: user.name }})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({ email });

        if(!user){
            return res.status(411).json({ message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token=jwt.sign({id: user._id}, process.env.JWT_SECRET);
            res.status(200).json({ token, user: { name: user.name }})
        } else{
            return res.status(411).json({ message: 'Invalid Credentials' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}