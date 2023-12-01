const express = require("express")
const app = express()
const { QueryTypes } = require('sequelize')
const cookieParser = require('cookie-parser')

const authRoute = require("./routes/authRoute.js");
const taskRoute = require("./routes/taskRoute.js");
const { decodeToken } = require("./services/decodedTocken.js");

require('dotenv').config()
const PORT=process.env.PORT

// database connection
require('./model/index.js')

app.use(cookieParser(process.env.SECRETKEY))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(async(req,res,next)=>{
    res.locals.currentUser = req.cookies.token
    const token = req.cookies.token
    console.log(token) 
    if(token){
        const decryptedResult = await decodeToken(token,process.env.SECRETKEY)
        if(decryptedResult && decryptedResult.id){
            res.locals.currentUserId = decryptedResult.id
        }
    }

    next()
})

app.use("",authRoute)
app.use("",taskRoute)

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});



app.get("/hello",(req,res)=>{
    res.send({message:"Hello World"})
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})