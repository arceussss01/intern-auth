const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    // let token;
    // let authHeader = req.headers.Authorization || req.headers.authorization;

    // if(authHeader && authHeader.startsWith("Bearer")){
    //     token = authHeader.split(" ")[1];

    //     if(!token){
    //         return res.status(401).json({message: "No token, access denied"});
    //     }

    //     try {
            
    //        const decode = jwt.verify(token, process.env.SECRET_KEY);

    //        req.user = decode;
    //        console.log("The decoder user is ", req.user);

    //        next();
           

    //     } catch (error) {
    //         res.status(401).json({message: "Token is not valid"})
    //     }
    // }
    // res.status(201).json({msg: "not authorized"})
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decode;
      console.log("The decoder user is ", req.user);
      return next();
      
    } catch (error) {
      return res.status(401).json({ message: "Token is not valid" });
    }
  }
  return res.status(401).json({ msg: "Not authorized, no Bearer token" });

}

module.exports = verifyToken;