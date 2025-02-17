const { registerUser, loginUser, userCredits } = require("../controllers/userController.js");
const userAuth = require("../middlewares/auth.js");
const express = require("express");

const userRouter=express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credits', userAuth, userCredits);

module.exports = userRouter;