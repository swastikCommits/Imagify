const { default: axios } = require('axios');
const userModel = require('../models/userModel');
const FormData = require('form-data');

const generateImage = async (req, res) => {
    try{
        const { userId, prompt } = req.body;
        
        const user = await userModel.findById(userId);  

        if(!user || !prompt){
            return res.status(411).json({ message: 'Missing Details' });
        }

        if(user.credits === 0  || userModel.creditBalance < 0){
            return res.status(411).json({ message: 'Insufficient CreditBalance', creditBalance: user.creditBalance });
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer'

        })

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        await userModel.findByIdAndUpdate(userId._id, {creditBalance: user.creditBalance - 1});
        
        res.status(200).json({ success: true, message: 'Image Generated', creditBalance: user.creditBalance - 1, resultImage });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { generateImage };