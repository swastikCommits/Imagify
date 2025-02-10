const jwt = require('jsonwebtoken');

const userAuth= async (req, res, next) => {
    const {token} = req.headers;

    if(!token){
        return res.status(403).json({ message: 'Unauthorized' });
    }

    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        } else{
            return res.status(403).json({ message: 'Unauthorized' });
        }

        next();
    }
    catch(error){
        console.log(error);
        return res.status(403).json({ message: 'Unauthorized' });
    }
}


module.exports = userAuth;