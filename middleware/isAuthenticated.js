const jwt = require("jsonwebtoken")
// const promisify = require("util").promisify

const { users } = require("../model/index.js")
const { decodeToken } = require("../services/decodedTocken.js")

exports.isAuthenticated = async (req,res,next)=>{
    const token = req.cookies.token

    //check if token given or not 
    if(!token){
        // return res.redirect("/login")
        return res.send("token must be provided.")
    }
    // verify token if it is legit or not
   const decryptedResult =  await decodeToken(token,process.env.SECRETKEY)
//    console.log(decryptedResult)

   // check if that id(userId) users table ma exist xa 
   const userExist = await users.findAll({
    where : {
        id : decryptedResult.id
    }
   })

   //check if length is zero or not(zero->userExist gardaina)
    if(userExist.length == 0){
        res.send("User with that token doesn't exist")
    }else{
        req.user =  userExist; // alternative decryptedResult.id
        req.userId = userExist[0].id 
      console.log(req.user, req.userId)
        next();
    }
}