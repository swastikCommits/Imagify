const express = require('express');
const {generateImage} = require('../controllers/imageController.js');
const userAuth = require('../middlewares/auth.js');


const imageRouter  = express.Router();

imageRouter.post('/generate-image', userAuth, generateImage);

module.exports = imageRouter; 
